import net from 'net';

import { PORT } from './config.js';
const clients = new Map();
const server = net.createServer((socket) =>{
    console.log('Client connected');
    socket.write('Welcome to TCP server!\nEnter your name: ');
    let clientName = null;
    socket.on('data', (data) =>{
        const message = data.toString().trim();
        if(!clientName){
            clientName = message;
            clients.set(socket, clientName);
            socket.write(`Hello ${clientName}, you can start chatting now.\n`);
            console.log(`Client ${clientName} connected.`);
            return;
        }
        console.log(`Received from ${clientName}: ${message}`);
        // Broadcast the message to all connected clients except the sender
        for(const [clientSocket, name] of clients.entries()){
            if(clientSocket !== socket){
                clientSocket.write(`${clientName}: ${message}\n`);
            }
        }
    });
    socket.on('end', () =>{
        console.log(`Client ${clientName} disconnected`);
        clients.delete(socket);
    });
    socket.on('error', (err) =>{
        console.error(`Socket error: ${err.message}`);
        clients.delete(socket);
    });
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
