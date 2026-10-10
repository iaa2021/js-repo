
import https from 'https';
import readline from 'readline';
import fs from 'fs';
import { PORT } from './config.js';

const options = {
    key: fs.readFileSync('./certs/client-key.pem'),
    cert: fs.readFileSync('./certs/client-cert.pem'),
    ca: fs.readFileSync('./certs/ca-cert.pem'),
    rejectUnauthorized: true
};

const client = https.request(
    {
        hostname: 'localhost',
        port: PORT,
        method: 'POST',
        path: '/',
        ...options,
        headers: {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked'
        }
    },
    (res) => {
        console.log(`Connected to HTTPS server on port ${PORT}.`);

        res.setEncoding('utf8');

        res.on('data', (message) => {
            process.stdout.write(message);
        });

        res.on('end', () => {
            console.log('Server ended response.');
        });
    }
);

client.on('error', (error) => {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt : 'myChat >'
});

let clientNameEntered = false;

rl.setPrompt('Enter your name: ');
rl.prompt();

rl.on('line', (input) => {
    const message = input.trim();

    if (message.toLowerCase() === 'exit') {
        rl.close();
        client.end();
        process.exit(0);
        return;
    }

    if (!message) {
        rl.prompt();
        return;
    }

    if (!clientNameEntered) {
        clientNameEntered = true;
        client.write(message + '\n');
        rl.setPrompt('myChat > ');
    } else {
        client.write(message + '\n');
        rl.prompt();
    }

    rl.prompt();
});

rl.on('close', () => {
    if (!client.destroyed) {
        client.end();
    }
});
client.flushHeaders();
