 const net = require('net');

// Create a TCP server
const server = net.createServer((socket) => {
  // 'socket' is a duplex stream

  // Handle incoming data (readable side)
  socket.on('data', (data) => {
    console.log('Received:', data.toString());

    // Echo back (writable side)
    socket.write(`Echo: ${data}`);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});

// To test, you can use a tool like netcat or telnet:
// $ nc localhost 8080
// or create a client:
/*
const client = net.connect({ port: 8080 }, () => {
  console.log('Connected to server');
  client.write('Hello from client!');
});

client.on('data', (data) => {
  console.log('Server says:', data.toString());
  client.end(); // Close the connection
});
*/