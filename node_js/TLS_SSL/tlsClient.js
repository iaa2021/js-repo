import tls from 'tls';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Client options
const options = {
  // For mutual authentication (optional)
  key: fs.readFileSync(path.join(__dirname, 'client-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'client-cert.pem')),
  // Server name for Server Name Indication (SNI)
  servername: 'localhost',
  // CA certificate to verify the server (optional)
 // ca: fs.readFileSync(path.join(__dirname, 'ca-cert.pem')),
  // Reject unauthorized certificates
  rejectUnauthorized: true
};

// Connect to server
const client = tls.connect(8000, 'localhost', options, () => {
  // Check if authorized
  console.log('Client connected',
    client.authorized ? 'authorized' : 'unauthorized');
    
  if (!client.authorized) {
    console.log('Reason:', client.authorizationError);
  }
  
  // Send data to server
  client.write('Hello from TLS client!');
});

// Set encoding for received data
client.setEncoding('utf8');

// Handle received data
client.on('data', (data) => {
  console.log('Received from server:', data);
  
  // Send another message
  client.write('How are you?');
});

// Handle errors
client.on('error', (error) => {
  console.error('Connection error:', error);
});

// Handle connection end
client.on('end', () => {
  console.log('Server ended connection');
});

// Close connection after 5 seconds
setTimeout(() => {
  console.log('Closing connection');
  client.end();
}, 5000);