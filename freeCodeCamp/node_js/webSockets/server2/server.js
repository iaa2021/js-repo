//import https from 'https';
import {WebSocketServer, WebSocket} from 'ws';
import express from 'express';
import fs from 'fs';
import { createServer } from 'https';
import PORT from './config.js';
const options = {
  key : fs.readFileSync('./certs/server-key.pem'),
   cert : fs.readFileSync('./certs/server-cert.pem')
}
const app = express();
app.use(express.static('public'));
const server = createServer(options, app);
const wss = new WebSocketServer({server});

wss.on('connection', (ws) =>{
    console.log('New client connected');
    ws.send('Welcome to WS server.');
    //message event handler
    ws.on('message', (message) =>{
        console.log(`Received: ${message}`);
        //echo message back to the client
    ws.send(`Server received: ${message}`);
    })
});
server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})
