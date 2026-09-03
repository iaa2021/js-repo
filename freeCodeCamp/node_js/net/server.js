import net from 'net';

const PORT = 3000;

const server = net.createServer((socket) => {
  console.log('Client connected');
  socket.write('Welcome to the TCP server!\n');

  socket.on('data', (data) => {
    console.log(`Received data: ${data}`);
    console.log('Client IP:', socket.remoteAddress);
    console.log('Client port:', socket.remotePort);
    console.log('Server IP:', socket.localAddress);
    console.log('Server port:', socket.localPort);
    // Process the received data here
    socket.write(`Received from client data is , ${data}`);
    });
    
  }); 

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});