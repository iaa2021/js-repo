import tls from 'tls';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server options with TLS certificates
const options = {
  key: fs.readFileSync(path.join(__dirname, 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'server-cert.pem')),
  // Request client certificate (optional)
  requestCert: true,
  // Reject connections without authorized certificates (optional)
  rejectUnauthorized: false
};

// Create TLS server
const server = tls.createServer(options, (socket) => {
  console.log('Server connected',
    socket.authorized ? 'authorized' : 'unauthorized');
  
  // Set encoding for data
  socket.setEncoding('utf8');
  
  // Handle incoming data
  socket.on('data', (data) => {
    console.log('Received:', data);
    // Echo back the data
    socket.write(`You said: ${data}`);
  });
  
  // Handle socket closure
  socket.on('end', () => {
    console.log('Socket ended');
  });
  
  // Write welcome message
  socket.write('Welcome to the TLS server!\n');
});

// Start TLS server
const port = 8000;
server.listen(port, () => {
  console.log(`TLS server running on port ${port}`);
});