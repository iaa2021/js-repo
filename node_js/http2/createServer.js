import http2 from 'http2';
import fs from 'fs';
import path from'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the TLS certificate and key
const options = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.crt'))
};

// Create an HTTP/2 server
const server = http2.createSecureServer(options);

// Handle stream events
server.on('stream', (stream, headers) => {
  // Get the path from headers
  const path = headers[':path'];
  
  // Send a response
  if (path === '/') {
    stream.respond({
      'content-type': 'text/html',
      ':status': 200
    });
    stream.end('<h1>Hello from HTTP/2!</h1>');
  } else {
    stream.respond({
      ':status': 404
    });
    stream.end('Not found');
  }
});

// Start the server
const port = 8080;
server.listen(port, () => {
  console.log(`HTTP/2 server running at https://localhost:${port}`);
});