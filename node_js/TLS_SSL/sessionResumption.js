import tls from 'tls';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server options
const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'server-cert.pem')),
  // Enable session resumption
  sessionTimeout: 300, // Session timeout in seconds
  ticketKeys: Buffer.from('0123456789abcdef0123456789abcdef'), // 32 bytes for key encryption
};

// Create TLS server
const server = tls.createServer(serverOptions, (socket) => {
  console.log('Client connected');
  
  // Check if this is a resumed session
  if (socket.isSessionReused()) {
    console.log('Session reused!');
  } else {
    console.log('New session');
  }
  
  socket.on('data', (data) => {
    console.log('Received:', data.toString());
    socket.write('Hello back!');
  });
  
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(8443, () => {
  console.log('TLS server listening on port 8443');
  
  // First client connection
  connectClient(() => {
    // Second client connection - should use session resumption
    connectClient();
  });
});

// Function to create a client with session resumption
let savedSession = null;

function connectClient(callback) {
  const clientOptions = {
    rejectUnauthorized: false, // For self-signed certificates
    session: savedSession // Use saved session if available
  };
  
  const client = tls.connect(8443, 'localhost', clientOptions, () => {
    console.log('Client connected. Authorized:', client.authorized);
    console.log('Using session resumption:', client.isSessionReused());
    
    // Save the session for future connections
    savedSession = client.getSession();
    
    // Send data
    client.write('Hello server!');
    
    // Close after a short delay
    setTimeout(() => {
      client.end();
      if (callback) setTimeout(callback, 100);
    }, 100);
  });
  
  client.on('data', (data) => {
    console.log('Client received:', data.toString());
  });
  
  client.on('error', (err) => {
    console.error('Client error:', err);
  });
}