import http from 'http';
import zlib from 'zlib';

// Create an HTTP server with compression
const server = http.createServer((req, res) => {
  // Sample response content
  const responseBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Zlib Compression Example</title>
    </head>
    <body>
      <h1>HTTP Compression with Zlib</h1>
      <p>This content is being compressed with Gzip before sending to your browser.</p>
      <p>Compression reduces bandwidth usage and improves page load times.</p>
      ${'<p>This paragraph is repeated to demonstrate compression efficiency.</p>'.repeat(50)}
    </body>
    </html>
  `;
  
  // Check if client accepts gzip encoding
  const acceptEncoding = req.headers['accept-encoding'] || '';
  
  // Set content type
  res.setHeader('Content-Type', 'text/html');
  
  // Compress response if client supports it
  if (/\bgzip\b/.test(acceptEncoding)) {
    // Client supports gzip
    res.setHeader('Content-Encoding', 'gzip');
    
    // Compress and send
    zlib.gzip(responseBody, (err, compressed) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      
      res.end(compressed);
    });
  } else if (/\bdeflate\b/.test(acceptEncoding)) {
    // Client supports deflate
    res.setHeader('Content-Encoding', 'deflate');
    
    // Compress and send
    zlib.deflate(responseBody, (err, compressed) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      
      res.end(compressed);
    });
  } else {
    // No compression supported
    res.end(responseBody);
  }
});

// Start server on port 8080
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Open this URL in your browser to see compression in action');
  console.log('The browser will automatically decompress the content');
});