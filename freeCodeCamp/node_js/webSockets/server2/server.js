import https from 'https';
import {WebSocketServer, WebSocket} from 'ws';
import express from 'express';
import fs from 'fs';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

//const options = {
  //  key : fs.readFileSync('./certs/server-key.pem'),
   // cert : fs.readFileSync('./certs/server-cert.pem')
//}
const app = express();
//const server = createServer(app, options);
const server = createServer(app);
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
server.listen(3000, () =>{
    console.log('Server linstens on port 3000');
})
