import {WebSocketServer} from "ws";
//new server
const wss = new WebSocketServer({port:3000});
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
