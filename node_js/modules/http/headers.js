const http = require('http');

const server = http.createServer((req, res) => {
  // Set status code and multiple headers
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'X-Powered-By': 'Node.js',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Set-Cookie': 'sessionid=abc123; HttpOnly'
  });

  res.end('<h1>Hello, World!</h1>');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});