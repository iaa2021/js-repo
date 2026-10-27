import db from './database.js';
import bcrypt from 'bcryptjs';
import { randomBytes, createHash } from 'crypto';
import express from 'express';
import {createServer} from 'https';
import {WebSocketServer, WebSocket} from "ws";
import { readFileSync } from 'fs';
import cookieParser from 'cookie-parser';

//import { text } from 'stream/consumers';
const app = express();
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
const SESSION_DURATION = 24 *60 * 60 * 1000; // 24 hours

function hashToken(token){
    return createHash('sha256').update(token).digest('hex');
}
function validUsername(username) { 
    return typeof username === 'string' &&
/^[a-zA-Z0-9_-]{3,30}$/.test(username); }

function validPassword(password){
    return typeof password === 'string' && password.length >= 6 &&
    password.length <= 72;
}

//register new account
app.post('/api/register', async(req, res) => {
    const { username, password } = req.body ?? {};
    if(!validUsername(username)){
        return res.status(400).json({
            error : 'Username must be 3-30 chars: letters, numbers, _ or -.'
        });
    }
    if(!validPassword(password)){
        return res.status(400).json({
            error : 'Password must be 6-72 characters long.'
        });
    }
    try{
        const passwordHash = await bcrypt.hash(password, 12);
        db.prepare(`
            INSERT INTO users (username, password_hash)
            VALUES (?, ?)`
            ).run(username, passwordHash);
            return res.status(201).json({
                message: 'Acc created. You can now log in.'
            });
    } catch(error){
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            return res.status(409).json({
                error: 'That username is already registered.'
            });
        }
        console.error('Registration error: ', error);
        return res.status(500).json({
            error: 'Unable to register account.'
        });
    }
});
//log in and create session
app.post('/api/login', async (req, res) =>{
    const { username, password } = req.body ?? {};
    if(
        typeof username !== 'string' || typeof password !== 'string' ||
        username.length > 30 || password.length > 72
    ){
        return res.status(400).json({
            error: 'Invalid username or password.'
        });
    }
    const user = db.prepare(`
        SELECT id, username, password_hash
        FROM users 
        WHERE username = ?
    `).get(username);
    //Use the same message for unknown usernames and wrong passwords
    if(!user || !(await bcrypt.compare(password, user?.password_hash ?? ''))){
        return res.status(401).json({
            error: 'Invalid username or password.'
        });
    }
    const token = randomBytes(32).toString('base64url');
    const tokenHash = hashToken(token);
    const expiresAt = Date.now() + SESSION_DURATION;
    db.prepare(`
        INSERT INTO sessions (token_hash, user_id, expires_at)
        VALUES (?, ?, ?)
        `).run(tokenHash, user.id, expiresAt);
        res.cookie('session', token, {
            httpOnly: true, 
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: SESSION_DURATION
        });
        return res.json({
            message: 'Login successful.',
            username: user.username
        });
    });
    //log out and invalidate the current session
app.post('/api/logout', (req, res) =>{
    const token = req.headers.cookie
    ?.split(';').map(part => part.trim())
    .find(part => part.startsWith('session='))
    ?.slice('session='.length);
    if(token){
        db.prepare(`DELETE FROM sessions WHERE token_hash = ?`)
        .run(hashToken(decodeURIComponent(token)));
    }
    res.setHeader('Set-Cookie', 
        'session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
        return res.json({ message: 'Logged out.'});
});    
// Serve index.html, chat.js and style.css from public/
app.use(express.static('public'));
const options = {
    key : readFileSync('certs/server-key-new.pem'),
    cert : readFileSync('certs/server-cert-new.pem')
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