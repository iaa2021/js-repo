import net from 'net';

const server = net.createServer((socket) => {
    // socket is a duplex stream
    //readable stream
    socket.on('data', (data) => {
        console.log(`Received data: ${data}`);
        // Echo the data back to the client
        socket.write(`Echo: ${data}`);
    });

    // writable stream
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});
server.listen(8081, () => {
    console.log('Server listening on port 8081');
});
const client = net.createConnection({ port: 8081 }, () => {
    console.log('Connected to server');
    // Send data to the server
    client.write('Hello, server!');
});
client.on('data', (data) => {
    console.log(`Received from server: ${data}`);
    // Close the connection after receiving the echo
    client.end();
});
client.on('end', () => {
    console.log('Disconnected from server');
});