import WebSocket from "ws";
import readline from 'readline';

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : 'myChat> '});

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () =>{
    console.log('Connected to WS server');
    rl.prompt();
});
ws.on('message', (message) => {
    //Print the server message, than redraw the prompt
    console.log(`\Server: ${message.toString()}`);
    rl.prompt();
});
ws.on('close', () =>{
    console.log('\nDisconnected from the server.');
    rl.close();
});
rl.on('line', (message) =>{
    const text = message.trim();
    if(text.toLowerCase() === 'exit'){
        rl.close(); ws.close(); return;
    }
    if(ws.readyState === WebSocket.OPEN){
        ws.send(text);
    }else{
        console.log('Not connected to the server.');
    }
    rl.prompt();
});