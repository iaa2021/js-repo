 const http = require('http');

const server = http.createServer((req, res) => {
  // Set content type to HTML
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Send a simple HTML page
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Hello Web</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            margin-top: 100px; 
            background-color: #f2f2f2; 
          }
          h1 { color: #0078d7; }
        </style>
      </head>
      <body>
        <h1>Hello, World!</h1>
        <p>This page is served by a Node.js web server 🎉</p>
      </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});