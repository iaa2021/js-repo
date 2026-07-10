import tls from 'tls';
import fs from'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load different certificates for different domains
const serverOptions = {
  SNICallback: (servername, cb) => {
    console.log(`SNI request for: ${servername}`);
    
    // Different certificate contexts based on hostname
    if (servername === 'example.com') {
      const context = tls.createSecureContext({
        key: fs.readFileSync(path.join(__dirname, 'server.com-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'server.com-cert.pem'))
      });
      cb(null, context);
    }
    else if (servername === 'another.com') {
      const context = tls.createSecureContext({
        key: fs.readFileSync(path.join(__dirname, 'server.com-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'server.com-cert.pem'))
      });
      cb(null, context);
    }
    else {
      // Default certificate
      const context = tls.createSecureContext({
        key: fs.readFileSync(path.join(__dirname, 'server-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'server-cert.pem'))
      });
      cb(null, context);
    }
  },
  // Default keys and certificates (used as a fallback)
  key: fs.readFileSync(path.join(__dirname, 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'server-cert.pem'))
};

// Create server
const server = tls.createServer(serverOptions, (socket) => {
  socket.write(`Hello, you connected to ${socket.servername || 'unknown'}!\n`);
  socket.end();
});

server.listen(8443, () => {
  console.log('TLS SNI server running on port 8443');
});