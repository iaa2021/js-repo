import tls from 'tls';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load multiple CA certificates
const caCerts = [
  fs.readFileSync(path.join(__dirname, 'ca-cert.pem')),
  fs.readFileSync(path.join(__dirname, 'ca-cert.pem')),
  fs.readFileSync(path.join(__dirname, 'ca-cert.pem'))
];

// Server with multiple CA certificates
const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'server-cert.pem')),
  ca: caCerts,  // Array of CA certificates
  requestCert: true,
  rejectUnauthorized: true
};

const server = tls.createServer(serverOptions, (socket) => {
  console.log('Client connected:', socket.authorized ? 'Authorized' : 'Unauthorized');
  
  // Get peer certificate
  const cert = socket.getPeerCertificate();
  console.log('Client certificate subject:', cert.subject);
  console.log('Issuer:', cert.issuer.CN);
  
  socket.write('Welcome to the secure server!\n');
  socket.end();
});

server.listen(8000, () => {
  console.log('TLS server running on port 8000');
});