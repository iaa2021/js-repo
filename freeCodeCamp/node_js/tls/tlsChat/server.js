import tls from 'tls';
import fs from 'fs';
import path from 'path';
import { PORT } from './config.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'server-cert.pem')),
  requestCert: true,
  rejectUnauthorized: false,
};
const clients = new Map();

const server = tls.createServer(options, (socket) => {
  console.log('Client connected:', socket.authorized ? 'Authorized' : 'Unauthorized');
  socket.setEncoding('utf8');
  socket.write('Welcome to the TLS chat server!\nEnter your name: ');
  let clientName = null;

  socket.on('data', (data) => {
    let message = data.toString().trim();
    if(!message) return;
    if (!clientName) {
      clientName = message;
      clients.set(socket, clientName);
      socket.write(`Hello, ${clientName}! You can now start chatting.\n`);
      console.log(`Client ${clientName} has joined the chat.`);
      return;
    } 
    for (const [clientSocket, name] of clients.entries()) {
      if (clientSocket !== socket) {
        clientSocket.write(`${clientName}: ${message}\n`);
      }
    }
    console.log(`${clientName}: ${message}`);
  });
  
  socket.on('end', () => {
    console.log(`Client ${clientName} disconnected.`);
    clients.delete(socket);
  });
  socket.on('error', (err) => {
    console.error(`Error with client ${clientName}:`, err.message);
    clients.delete(socket);
  });
});

server.listen(PORT, () => {
  console.log(`TLS chat server is running on port ${PORT}`);
});
    