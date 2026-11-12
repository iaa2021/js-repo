const chatStatus = document.getElementById('chatStatus');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');

const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(`${wsProtocol}//${window.location.host}`);

ws.onopen = () => {
    chatStatus.textContent = 'Connected to the chat server.'
    chatStatus.style.color = 'green';
};
ws.onmessage = (event) => {
    const message = document.createElement('div');
    message.textContent = event.data;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
};
ws.onerror = (error) => {
    chatStatus.textContent = 'error: ' + error.message;
    chatStatus.style.color = 'red';
};
ws.onclose = () => {
    chatStatus.textContent = 'Disconnected from the chat server.';
    chatStatus.style.color = 'red';
};

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && messageInput.value.trim() !== '') {
        sendMessage();
    }
});
function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        if (ws.readyState !== WebSocket.OPEN) {
            chatStatus.textContent = 'Not connected to the chat server.';
            chatStatus.style.color = 'red';
            return;
        }
        ws.send(message);
        messageInput.value = '';
    }
};
