import http2 from 'http2';

// Create an HTTP/2 server without TLS
const server = http2.createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });
  stream.end('<h1>Hello from HTTP/2 without TLS!</h1>');
});

server.listen(8081);