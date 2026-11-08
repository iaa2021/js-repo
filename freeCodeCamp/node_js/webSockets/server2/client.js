import {WebSocket} from 'ws';
import readline from 'readline';
import PORT from './config.js';
import fs from 'fs';
const ca = fs.readFileSync('./certs/localchat-ca-cert.pem');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'My chat> : '
});
const ws = new WebSocket(`https://localhost:${PORT}`, { ca : ca});
ws.on('open', () =>{
    console.log('Connected to WS server');
    PromptForMessage();
});
ws.on('message', (message) => {
    console.log(`Received: ${message}`);
});
ws.on('close', () => {
    console.log('Disconnected from WS server');
    rl.close();
});
ws.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
});
function PromptForMessage() {
    rl.question('Enter message or exit to quit: ', (message) => {
        if (message.toLowerCase() === 'exit') {
            rl.close();
            ws.close();
            return;
        } else {
            ws.send(message);
            PromptForMessage();
        }
    });
}
