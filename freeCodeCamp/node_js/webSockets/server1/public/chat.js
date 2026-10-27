
const statusElement = document.getElementById('status');
const messages = document.getElementById('messages');

const authSection = document.getElementById('authSection');
const authForm = document.getElementById('authForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');

const chatSection = document.getElementById('chatSection');
const currentUsername = document.getElementById('currentUsername');
const logoutButton = document.getElementById('logoutButton');

const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const recipientInput = document.getElementById('recipientInput');
const sendButton = document.getElementById('sendButton');

let ws = null;
let username = '';
let busy = false;

function setStatus(message, color = '') {
    statusElement.textContent = message;
    statusElement.style.color = color;
}

function setBusy(value) {
    busy = value;
    loginButton.disabled = value;
    registerButton.disabled = value;
}

async function apiRequest(path, body = {}) {
    const response = await fetch(path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || `Request failed: ${response.status}`);
    }

    return data;
}

function addMessage(data) {
    const element = document.createElement('div');
    element.className = 'message';

    // textContent prevents incoming messages from being interpreted as HTML.
    if (data.type === 'error') {
        element.textContent = `Error: ${data.text}`;
    } else if (data.type === 'private') {
        const direction = data.sentByMe
            ? `Private message to ${data.to}`
            : `Private message from ${data.username}`;

        element.textContent = `${direction}: ${data.text}`;
    } else if (data.username) {
        element.textContent = `${data.username}: ${data.text}`;
    } else {
        element.textContent = data.text || '';
    }

    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
}

function connectChat() {
    // The browser automatically sends same-origin cookies on the WS handshake.
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${protocol}//${location.host}`);

    ws.onopen = () => {
        setStatus('Connected to chat server.', 'green');

        // This matches the join message expected by the current server.js.
        ws.send(JSON.stringify({
            type: 'join',
            username
        }));
    };

    ws.onmessage = (event) => {
        let data;

        try {
            data = JSON.parse(event.data);
        } catch {
            return;
        }

        addMessage(data);
    };

    ws.onerror = () => {
        setStatus('WebSocket connection error.', 'red');
    };

    ws.onclose = () => {
        ws = null;
        setStatus('Chat connection closed.');
        sendButton.disabled = true;
    };
}

authForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (busy) return;

    setBusy(true);

    try {
        const data = await apiRequest('/api/login', {
            username: usernameInput.value.trim(),
            password: passwordInput.value
        });

        username = data.username;
        currentUsername.textContent = username;

        passwordInput.value = '';
        authSection.hidden = true;
        chatSection.hidden = false;

        messages.replaceChildren();
        connectChat();

        messageInput.focus();
    } catch (error) {
        setStatus(error.message, 'red');
    } finally {
        setBusy(false);
    }
});

registerButton.addEventListener('click', async () => {
    if (busy) return;

    setBusy(true);

    try {
        const data = await apiRequest('/api/register', {
            username: usernameInput.value.trim(),
            password: passwordInput.value
        });

        setStatus(data.message || 'Account created. Please log in.', 'green');

        // Registration does not log the user in automatically.
        passwordInput.value = '';
        passwordInput.setAttribute('autocomplete', 'current-password');
        passwordInput.focus();
    } catch (error) {
        setStatus(error.message, 'red');
    } finally {
        setBusy(false);
    }
});

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!ws || ws.readyState !== WebSocket.OPEN) {
        setStatus('Not connected to the chat server.', 'red');
        return;
    }

    const text = messageInput.value.trim();
    const recipient = recipientInput.value.trim();

    if (!text) return;

    if (recipient) {
        ws.send(JSON.stringify({
            type: 'private',
            to: recipient,
            text
        }));
    } else {
        ws.send(JSON.stringify({
            type: 'chat',
            text
        }));
    }

    messageInput.value = '';
    messageInput.focus();
});

logoutButton.addEventListener('click', async () => {
    logoutButton.disabled = true;

    try {
        const data = await apiRequest('/api/logout');

        // Close the active chat connection.
        if (ws) {
            ws.close(1000, 'Logged out');
            ws = null;
        }

        username = '';
        chatSection.hidden = true;
        authSection.hidden = false;
        messages.replaceChildren();
        authForm.reset();

        setStatus(data.message || 'Logged out.');
        usernameInput.focus();
    } catch (error) {
        setStatus(error.message, 'red');
    } finally {
        logoutButton.disabled = false;
    }
});
