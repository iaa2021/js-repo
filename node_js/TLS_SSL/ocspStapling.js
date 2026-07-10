import tls from 'tls';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Server with OCSP stapling
const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'server-cert.pem')),
  ca: fs.readFileSync(path.join(__dirname, 'ca-cert.pem')),
  
  // Enable OCSP stapling
  requestOCSP: true,
  
  // OCSP response cache timeout (in milliseconds)
  ocspCache: new tls.OCSPCache({
    max: 1000,  // Maximum number of cached responses
    maxAge: 60 * 60 * 1000  // Cache for 1 hour
  })
};

// Create HTTPS server with OCSP stapling
const server = https.createServer(serverOptions, (req, res) => {
  res.writeHead(200);
  res.end('Hello with OCSP stapling!\n');
});

// Handle OCSP request errors
server.on('OCSPRequest', (cert, issuer, callback) => {
  if (!cert || !issuer) {
    return callback(new Error('No certificate or issuer provided'));
  }
  
  // Get OCSP URL from certificate
  const ocspUrl = tls.getOCSPURL(cert);
  if (!ocspUrl) {
    return callback(new Error('No OCSP URL in certificate'));
  }
  
  console.log('OCSP request for:', cert.subject.CN);
  
  // In a real application, you would make an OCSP request here
  // and return the response via the callback
  
  // For demonstration, we'll just return a dummy response
  const ocspResponse = Buffer.from('OCSP response would go here');
  callback(null, ocspResponse);
});

server.listen(443, () => {
  console.log('HTTPS server with OCSP stapling running on port 443');
});

// Client that verifies OCSP stapling
const clientOptions = {
  host: 'example.com',
  port: 443,
  rejectUnauthorized: true,
  requestOCSP: true  // Request OCSP stapling from server
};

const req = https.request(clientOptions, (res) => {
  console.log('Response status code:', res.statusCode);
  
  // Get the OCSP response from the server
  const ocspResponse = res.socket.getOCSPResponse();
  if (ocspResponse) {
    console.log('Received OCSP response');
    // Verify the OCSP response here
  } else {
    console.log('No OCSP response received');
  }
  
  res.on('data', (chunk) => {
    console.log('Received data:', chunk.toString());
  });
});

req.on('error', (err) => {
  console.error('Request error:', err);
});

req.end();
