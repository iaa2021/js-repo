import http from 'http';
import zlib from 'zlib';

// Sample API data (imagine this is from a database)
const apiData = {
  users: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? 'admin' : 'user',
    created: new Date().toISOString(),
    profile: {
      bio: `This is a sample bio for user ${i + 1}. It contains some text to demonstrate compression.`,
      interests: ['programming', 'reading', 'hiking', 'cooking', 'music'],
      settings: {
        notifications: true,
        theme: 'dark',
        language: 'en'
      }
    }
  }))
};

// Create a simple API server
const server = http.createServer((req, res) => {
  // Only handle GET requests to /api/users
  if (req.method === 'GET' && req.url === '/api/users') {
    // Convert data to JSON string
    const jsonData = JSON.stringify(apiData);
    
    // Check if client accepts compression
    const acceptEncoding = req.headers['accept-encoding'] || '';
    
    // Set JSON content type
    res.setHeader('Content-Type', 'application/json');
    
    // Compress based on accepted encoding
    if (/\bgzip\b/.test(acceptEncoding)) {
      res.setHeader('Content-Encoding', 'gzip');
      
      // Compress and send
      zlib.gzip(jsonData, (err, compressed) => {
        if (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Compression failed' }));
          return;
        }
        
        console.log(`Original size: ${jsonData.length} bytes`);
        console.log(`Compressed size: ${compressed.length} bytes`);
        console.log(`Compression ratio: ${Math.round(100 - (compressed.length / jsonData.length * 100))}%`);
        
        res.end(compressed);
      });
    } else {
      // No compression
      console.log(`Sending uncompressed response: ${jsonData.length} bytes`);
      res.end(jsonData);
    }
  } else {
    // Not found
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}/`);
  console.log('Test the API by visiting: http://localhost:8080/api/users');
});