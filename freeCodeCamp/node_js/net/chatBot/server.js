import net from 'net';

export const PORT = 3000;
const server = net.createServer((socket) =>{
    console.log('Client connected');
    socket.write('Welcome to TCP server!');
    socket.on('data', (data) =>{
        const message = data.toString().trim();
        console.log(`Received data: ${message}`);
        console.log('Client IP:', socket.remoteAddress);
        console.log('Client port:', socket.remotePort);
        console.log('Server IP:', socket.localAddress);
        console.log('Server port:', socket.localPort);
        socket.write(`Server received: ${message}\n`)
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
