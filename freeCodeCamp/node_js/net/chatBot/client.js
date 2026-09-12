import net from 'net';
import readline from 'readline';
import {PORT}  from './config.js';
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
    // send the message to the server
    client.write(message + '\n');
    rl.prompt();
});
client.on('data', (data) => {
    console.log(`\n${data.toString().trim()}`);
    rl.prompt();
});
rl.on('close', () =>{
    console.log('Readline interface closed.');
});
client.on('end', () => {
    console.log('Disconnected from server.');
    rl.close();
});
client.on('error', (err) => {
    console.error(`Client error: ${err.message}`);
    rl.close();
});