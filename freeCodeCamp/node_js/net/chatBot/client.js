import net from 'net';
import readline from 'readline';
import {PORT}  from './server';
const rl = readline.createInterface({
    input : process.stdin, 
    output : process.stdout,
    prompt : 'myChat >'
})
const client = net.createConnection(
    { port : PORT, host : '127.0.0.1'}, () =>{
        console.log('Client connected to server.');
        rl.prompt();
    } );
rl.on('line', (line) => {
    const message = line.trim();
    if(message.toLowerCase() === 'exit'){
        rl.close(); client.end(); return;
    }
    client.write(message);
    rl.prompt();
});
client.on('data', (data) => {
    console.log(`\nServer: ${data.toString().trim()}`);
    rl.prompt();
});
rl.on('close', () =>{
    console.log('Disconnected from server.');
});