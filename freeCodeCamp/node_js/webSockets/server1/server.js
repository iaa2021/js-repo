import express from 'express';
import {createServer} from 'http';
import {WebSocketServer} from "ws";
const app = express();

app.use(express.static('public'));
//new server
const server = createServer(app);
//attach WebSocket to the same server
const wss = new WebSocketServer({server});
console.log('WS server is running on ws://localhost:3000');
//connection event handler
wss.on('connection', (ws) =>{
    console.log('New client connected');
    //send hello to client
    ws.send('Welcome to WS server!');
    //message event handler
    ws.on('message', (message) =>{
        const text = message.toString();
        console.log(`Received: ${text}`);
        //echo message to client
        ws.send(`Server received ${text}`);
    });
    ws.on('close', () =>{
    console.log('Client disconnected.')
    });
});
//start listening on port 3000
server.listen(3000, () =>{
    console.log('HTTP and WS run at http://localhost:3000');
})