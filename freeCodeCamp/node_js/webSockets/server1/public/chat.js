const status = document.getElementById('status');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
//connecting with WS server
const ws = new WebSocket('ws://localhost:3000');
//connection opened
ws.onopen = () =>{
    string.textContent = 'Connected to server';
    string.style.color = 'green'
};
//Listen for messages
ws.onmessage = (event) =>{
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = event.data;
    messages.appendChild(message);
    message.scrollTop = messages.scrollHeight;
};
//Handle errors
ws.onerror = (error) =>{
    string.textContent = 'Error: ' + error.message;
    string.style.color = 'red';
};
//Handle connection close
ws.onclose = () =>{
    string.textContent = 'Disconnected from server';
    string.style.color = 'green';
};
//Function to send message
function sendMessage(){
const message = messageInput.value.trim();
if(message){
    ws.send(message);
    messageInput.value = '';
    }
};
//send message on Enter key
messageInput.addEventListener('keypress', (e) =>{
    if(e.key === 'Enter'){
        sendMessage();
    }
});