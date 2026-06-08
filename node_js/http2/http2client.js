import http2 from 'http2';

// Create a client
const client = http2.connect('https://localhost:8080', {
  // For self-signed certificates in development
  rejectUnauthorized: false
});

// Error handling
client.on('error', (err) => {
  console.error('Client error:', err);
});

// Create a request
const req = client.request({ ':path': '/' });

// Handle response data
req.on('response', (headers) => {
  console.log('Status:', headers[':status']);
  console.log('Headers:', headers);
});

req.on('data', (chunk) => {
  console.log('Received data:', chunk.toString());
});

req.on('end', () => {
  console.log('Request completed');
  client.close();
});

// Send the request
req.end();