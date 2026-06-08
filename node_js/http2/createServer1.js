import http2 from 'http2';
import fs from 'fs';
import path from 'path';

// Read the TLS certificate and key
//const options = {
  //key: fs.readFileSync(path.join(__dirname, 'server.key')),
  //cert: fs.readFileSync(path.join(__dirname, 'server.crt'))
//};
const options = {
  key: fs.readFileSync(new URL('./server.key', import.meta.url)),
  cert: fs.readFileSync(new URL('./server.crt', import.meta.url))
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
const port = 8081;
server.listen(port, () => {
  console.log(`HTTP/2 server running at https://localhost:${port}`);
});