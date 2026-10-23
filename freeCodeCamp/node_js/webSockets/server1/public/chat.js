const statusElement = document.getElementById('status');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
//connecting with WS server
const ws = new WebSocket('ws://localhost:3000');
//connection opened
ws.onopen = () =>{
    statusElement.textContent = 'Connected to server';
    statusElement.style.color = 'green'
};
//Listen for messages
ws.onmessage = (event) =>{
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = event.data;
    messages.appendChild(message);
    // Scroll the messages container to the bottom
    message.scrollTop = messages.scrollHeight;
};
//Handle errors
ws.onerror = (error) =>{
    statusElement.textContent = 'Error: ' + error.message;
    statusElement.style.color = 'red';
};
//Handle connection close
ws.onclose = () =>{
    statusElement.textContent = 'Disconnected from server';
    statusElement.style.color = 'green';
};
//Function to send message
function sendMessage(){
const text = messageInput.value.trim();
if(!text) return;
if(ws.readyState !== WebSocket.OPEN){
    statusElement.textContent = 'WS is not connected';
    return;
    }
    ws.send(text);
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