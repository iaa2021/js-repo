import https from 'https';
import readline from 'readline';
import { PORT } from './config.js';

const options = {
    rejectUnauthorized: false,
    headers: {
        'Content-Type': 'text/plain', 
        'Transfer-Encoding': 'chunked'
    }
};
let rl;
let clientNameEntered = false;
const client = https.request(`https://localhost:${PORT}`, options, (res) => {
    console.log(`Connected to HTTPS server on port ${PORT}`);
        res.on('data', (chunk) => {
        const message = chunk.toString();
        process.stdout.write(message);
            if(!clientNameEntered && message.includes('Enter your name')) {
                rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout });
                rl.setPrompt('Enter your name: ');
                rl.prompt();
            rl.on('line', (line) => {
                const message = line.trim();
                if (message.toLowerCase() === 'exit') {
                    client.end();
                    rl.close();
                    process.exit(0);
                    return;
                } 
                if(!clientNameEntered) {
                    clientNameEntered = true;
                    client.write(message + '\n');
                    rl.setPrompt('myChat> ');
                    rl.prompt();
                }
                   else {
                    client.write(message + '\n');
                    rl.prompt();
                }        
            });
            rl.on('close', () => {
                console.log('Exiting chat client.');
                client.end();
            });
        } else if(rl && clientNameEntered) {
            rl.prompt();
        }
    });
    res.on('end', () => {
        console.log('Server ended the response.');
}); });


client.on('error', (err) => {
    console.error(`Error: ${err.message}`);
    if (rl) {
    rl.close();    }
    });
client.on('response', () => {
    console.log('Response event received');
});
client.flushHeaders();
