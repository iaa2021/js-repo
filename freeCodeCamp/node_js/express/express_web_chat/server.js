import express from 'express';
import https from 'https';
import fs from 'fs';
import { Server } from 'socket.io';
import { PORT } from './config.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const tlsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'server-cert.pem')),
    ca: fs.readFileSync(path.join(__dirname, 'certs', 'ca-cert.pem')),
    requestCert: true,
    rejectUnauthorized: true,
};
app.use(express.static(path.join(__dirname, 'public')));

const httpsServer = https.createServer(tlsOptions, app);
const io = new Server(httpsServer);

io.on('connection', (socket) => {
  console.log('A client connected: ' + socket.id);
    socket.on('join', (name) => {
        // Limit name length to 30 characters
        const safeName = String(name).trim().slice(0, 30); 
        socket.data.name = safeName;
        io.emit('system message', `${safeName} has joined the chat.`);
    });
    
    socket.on('chat message', (message) => {
        const name = socket.data.name || 'Anonymous';
        if(!name || typeof message !== 'string' || message.trim() === '') {
            return; // Ignore empty messages or if name is not set
        }
        // Limit message length to 1000 characters
        const text = message.trim().slice(0, 1000); 
        io.emit('chat message', { name, message: text, time: new Date().toLocaleTimeString() });
    });

    socket.on('disconnect', () => {
        const name = socket.data.name || 'Anonymous';
        if(name) {
            io.emit('system message', `${name} has left the chat.`);
        }
        console.log('A client disconnected: ' + socket.id);
    });
});

httpsServer.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});