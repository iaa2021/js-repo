const socket = io();
const joinForm = document.querySelector('#join-form');
const username = document.querySelector('#username');
const chatArea = document.querySelector('#chat-area');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const messages = document.querySelector('#messages');
const leaveButton = document.querySelector('#leave-btn');

function addMessage(text){
    const item = document.createElement('li');
    // Use textContent to avoid interpreting messages as HTML
    item.textContent = text;
    messages.appendChild(item);
    item.scrollIntoView({ block: 'end', behavior: 'smooth' });
}
joinForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = username.value.trim();
    if(!name){
        alert('Please enter a username');
        return;
    }
    socket.emit('join', name);
    joinForm.hidden = true;
    chatArea.hidden = false;
    messageInput.focus();
});
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = messageInput.value.trim();
    if(!text){
        alert('Please enter a message');
        return;
    }
    socket.emit('chat message', text);
    messageInput.value = '';
    messageInput.focus();
});
socket.on('chat message', ({name, message, time}) => {
    addMessage(`[${time}] ${name}: ${message}`);
});
socket.on('system message', (text) => {
    addMessage(`[System]: ${text}`);
});
leaveButton.addEventListener('click', () => {
    socket.disconnect();
    chatArea.hidden = true;
    joinForm.hidden = false;
    username.value = '';
    messages.innerHTML = '';
});