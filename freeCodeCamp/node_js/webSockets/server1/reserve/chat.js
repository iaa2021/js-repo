const statusElement = document.getElementById('status');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const usernameInput = document.getElementById('usernameInput');
const joinButton = document.getElementById('joinButton');
const exitButton = document.getElementById('exitButton');
//connecting with WS server
const ws = new WebSocket('wss://localhost:3000');
let username = '';
//connection opened
ws.onopen = () =>{
    statusElement.textContent = 'Connected to server';
    statusElement.style.color = 'green'
};
//Listen for messages
ws.onmessage = (event) =>{
    let data;
    try{
        data = JSON.parse(event.data);
    }catch{ return; }
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = data.username === 'Server' ? data.text
    : `${data.username}: ${data.text}`;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
};
//Handle errors
ws.onerror = (error) =>{
    statusElement.textContent = 'Error: ' + error.message;
    statusElement.style.color = 'red';
};
//Handle connection close
ws.onclose = () =>{
    statusElement.textContent = 'Disconnected from server';
    username = '';
    statusElement.style.color = 'green';
    setChatControls(false);
};
function setChatControls(joined) {
    usernameInput.disabled = joined;
    joinButton.disabled = joined;
    messageInput.disabled = !joined;
    sendButton.disabled = !joined;
    exitButton.disabled = !joined;
}
joinButton.addEventListener('click', () =>{
    const name = usernameInput.value.trim();
    if(!name){
        statusElement.textContent = 'Please, enter your name'; 
        usernameInput.focus();
        return;
    }
    if(ws.readyState !== WebSocket.OPEN){
        statusElement.textContent = 'Not connected to the server';
        return;
    }
    username = name.slice(0,30);
    ws.send(JSON.stringify({
        type: 'join', username
    }));
    setChatControls(true);
    statusElement.textContent =`You joined as ${username}`;
    messageInput.focus();
    //usernameInput.disabled = true;
    //joinButton.disabled = true;
    });
//Function to send message |
function sendMessage(){
const text = messageInput.value.trim();
const recipient = document.getElementById('recipientInput')
.value.trim();
if(!text || ws.readyState !== WebSocket.OPEN) return;
if(recipient){
    //private message to one user
    ws.send(JSON.stringify({
        type: 'private',
        to: recipient,
        text: text
    }));
} else {
    //normal public message to everyone
    ws.send(JSON.stringify({
        type: 'chat',
        text: text
    }));
}
messageInput.value = '';
messageInput.focus();
};
//attach click event to the button
sendButton.addEventListener('click', sendMessage);
//send message on Enter key
messageInput.addEventListener('keydown', (e) =>{
    if(e.key === 'Enter'){
        sendMessage();
    }
});
usernameInput.addEventListener('keydown',(event) =>{
    if(event.key === 'Enter'){
        joinButton.click();
    }
});
exitButton.addEventListener('click', () =>{
    if(ws.readyState === WebSocket.OPEN){
        ws.close(1000, 'User left the chat');
    }
    username = '';
    setChatControls(false);
    statusElement.textContent = 'You left the chat';
});
// ||