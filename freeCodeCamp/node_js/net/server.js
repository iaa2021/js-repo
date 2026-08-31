import net from 'net';

const PORT = 3000;

const server = net.createServer((socket) => {
  console.log('Client connected');
  socket.write('Welcome to the TCP server!\n');

  socket.on('data', (data) => {
    console.log(`Received data: ${data}`);
    // Process the received data here
  }); });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});