 import net from 'net';

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('Client connected');
  
  // Set encoding to utf8 so we receive strings instead of Buffer objects
  socket.setEncoding('utf8');
  
  // Handle data from client
  socket.on('data', (data) => {
    console.log(`Received from client: ${data}`);
    
    // Echo the data back to the client
    socket.write(`Echo: ${data}`);
  });
  
  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });
  
  // Handle errors
  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
  
  // Send a welcome message to the client
  socket.write('Welcome to the TCP server!\r\n');
});

// Start the server and listen on port 8080
server.listen(8080, () => {
  console.log('TCP Server running on port 8080');
});