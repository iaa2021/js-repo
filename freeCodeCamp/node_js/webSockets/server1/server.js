import express from 'express';
import {createServer} from 'https';
import {WebSocketServer, WebSocket} from "ws";
import { readFileSync } from 'fs';
import { text } from 'stream/consumers';
const app = express();
// Serve index.html, chat.js and style.css from public/
app.use(express.static('public'));
const options = {
    key : readFileSync('certs/server-key.pem'),
    cert : readFileSync('certs/server-cert.pem')
}
//new server
const server = createServer(options, app);
//attach WebSocket to the same server
const wss = new WebSocketServer({server});
console.log('WS server is running on wss://localhost:3000');
//connection event handler
wss.on('connection', (ws) =>{
    console.log('New client connected');
    //Store the username for this particular connection
    ws.username = '';
    //send hello to client
    ws.send(JSON.stringify({
        username : 'Server',
        text : 'Welcome to chat room'
    }));
    //message event handler
    ws.on('message', (message) =>{
        let data;
        try{
            data = JSON.parse(message.toString());
        } catch{ return; }
        //A client chooses a username
        if(data.type === 'join'){
        //do not allow same connection to join twice
        if(ws.username){
            ws.send(JSON.stringify({
                type: 'error',
                text: 'You have already joined the chat.'
            }));
            return;
        }
        const username = String(data.username ?? '').trim().slice(0, 30);
        if(!/^[a-zA-Z0-9_-]{3,30}$/.test(username)){
            ws.send(JSON.stringify({
                type: 'error', 
                text: 'Username must be 3-30 chars: letters, numbers, _ or - '
            }));
            return;
        }
        //Check whether another client uses this username
        const alreadyTaken = [...wss.clients].some(
            client => client !== ws && client.readyState === WebSocket.OPEN &&
        client.username?.toLowerCase() === username.toLowerCase()
        );
        //important: reject duplicate usernames
        if(alreadyTaken){
            ws.send(JSON.stringify({
                type: 'error',
                text:`Username "${username}" is already taken.`
            }));
            return;
        }
        //assign the username only after all checks pass.
        ws.username = username;
            console.log(`${username} joined the chat`);
        ws.send(JSON.stringify({
            type: 'system',
            username : 'Server',
            text :`Welcome, ${username}!`
        }));
            return;        }
        // only joined clients can send chat  messages
        if(data.type === 'chat'){
            const text = String(data.text ?? '').trim().slice(0, 1000); 
            if(!ws.username || !text) return;
            const chatMessage = JSON.stringify({
                username : ws.username, text
            });
            //broadcast the message to every connected client
            for(const client of wss.clients){
                if(client.readyState === WebSocket.OPEN){
                    client.send(chatMessage);
                }
            }
        }
        if(data.type === 'private'){
            const recipient = String(data.to ?? '').trim();
            const text = String(data.text ?? '').trim().slice(0, 1000);
            if(!ws.username || !recipient || !text) return;
            //find the connected user with this username
            const target = [...wss.clients].find(
                client => client.readyState === WebSocket.OPEN && 
                client.username?.toLowerCase() === recipient.toLowerCase()
            );
            if(!target){
                ws.send(JSON.stringify({
                    username : 'Server',
                    text : `User "${recipient}" is not online.`
                }));
                return;
            }
        
        //send only to the recipient
        target.send(JSON.stringify({
            type: 'private',
            username: ws.username,
            to: target.username,
            text: text
        }));
        //Also show copy to sender
        if(target !== ws){
            ws.send(JSON.stringify({
                type: 'private', 
                username: ws.username, 
                to: target.username,
                text: text,
                sentByMe: true
            }));
        }
        }
        });
    ws.on('close', () =>{
    console.log(`${ws.username || 'A client'} disconnected`);
    });
});
//start listening on port 3000
server.listen(3000, () =>{
    console.log('HTTP and WS run at https://localhost:3000');
}); // ||