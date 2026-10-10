import https from 'https';
import fs from 'fs';
import {PORT} from './config.js';
const options = {
    key : fs.readFileSync('./certs/server-key.pem'),
    cert : fs.readFileSync('./certs/server-cert.pem'),
    rejectUnauthorized : true, 
    requestCert : true,
    ca : [ fs.readFileSync('./certs/ca-cert.pem')]
}
const clients = new Map();
const server = https.createServer( options, (req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write('Hello, enter your name to chat.\n');
    let clientId = req.socket.remoteAddress + ':' + req.socket.remotePort;
    let clientName = null;
    req.on('end', () => {
    console.log(`Client ${clientName} ended request`);
    });
    req.on('data', (chunk) =>{
        console.log('Received raw data: ', JSON.stringify(chunk.toString().trim()));
        const message = chunk.toString().trim();
        if(!clientName){
            clientName = message;
            clients.set(clientId, {
                name : clientName,
                res : res
            });
        console.log(`Client ${clientName} connected`);
        res.write(`Welcome ${clientName}, you can start chatting.\n`);    
        } else {
            console.log(`Client ${clientName} says ${message}\n`);
            for(let [id, client] of clients){
                if(id !== clientId){
                    client.res.write(`Client ${clientName} says ${message}\n`);
                }
            }
        }
    });
});
server.listen(PORT, () => {
    console.log(`Server listens on port ${PORT}`);
})
