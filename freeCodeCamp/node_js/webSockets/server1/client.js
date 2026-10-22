import WebSocket from "ws";
import readline from 'readline';
//creating readline interface for user's input
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : 'myChat> '
});
//connect to ws server
const ws = new WebSocket('ws://localhost:3000');
//opening connection
ws.on('open', () =>{
    console.log('Connected to WS server');
    promptForMessage();
});
//listen for messages from the server
ws.on('message', (message) =>{
    console.log(`\nServer: ${message}`);
});
//handle errors
ws.on('error', (error) =>{
    console.error('WebSocket error: ', error);
});
//handle closing connection
ws.on('close', () =>{
    console.log('Disconnected from the server');
    process.exit(0);
});
function promptForMessage() {
    rl.question('Enter message(or exit to quit):', (message) =>{
        if(message.toLowerCase().trim() === 'exit'){
            ws.close(); rl.close(); return;
        }
        ws.send(message);
        promptForMessage();
    })

}
