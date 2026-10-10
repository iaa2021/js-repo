import https from 'https';
import fs from 'fs';
import { PORT } from './config.js';
const options = {
    key: fs.readFileSync('./certs/server-key.pem'),
    cert: fs.readFileSync('./certs/server-cert.pem')
};
const clients = new Map();
const server = https.createServer(options, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello from HTTPS server! Enter your name to join the chat.\n');
    
    let clientId = req.socket.remoteAddress + ':' + req.socket.remotePort;
    let clientName = null;
    req.on('end', () => {
        console.log('Client request ended');
    });
    req.on('data', (chunk) => {
        
        const message = chunk.toString().trim();
        if(!clientName) {
            clientName = message;
            clients.set(clientId, {
                name: clientName,
                res: res
            });
            console.log(`Client ${clientName} connected.`);
            res.write(`Welcome ${clientName}! You can start sending messages.\n`);
        } else {
        console.log(`Client ${clientName} says: ${message}\n`); 
        for (let [id, client] of clients) {
            if (id !== clientId) {
                client.res.write(`Client ${clientName} says: ${message}\n`);
            }
        } 
    }
    }); 
});
server.listen(PORT, () => {
    console.log(`HTTPS server listening on port ${PORT}`);
});