import net from 'net';

const PORT = 3000;

const client = net.createConnection({ port: PORT, host: '127.0.0.1' }, 
() => {
    console.log('Connected to server');
    client.write('Hello, server!');
});
client.on('data', (data) => {
    console.log(`Received from server: ${data}`);
    // Process the received data here
});
client.on('end', () => {
    console.log('Disconnected from server');
});