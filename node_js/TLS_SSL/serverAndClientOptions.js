import tls from 'tls';
import fs from 'fs';

// Comprehensive server options
const serverOptions = {
  // Key and certificate
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  
  // Certificate Authority
  ca: [fs.readFileSync('ca-cert.pem')],
  
  // Protocol version control
  minVersion: 'TLSv1.2',
  maxVersion: 'TLSv1.3',
  
  // Cipher control
  ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384',
  
  // Client authentication
  requestCert: true,
  rejectUnauthorized: true,
  
  // Server Name Indication handling
  SNICallback: (servername, cb) => {
    // Different certificates for different servernames
    if (servername === 'example.com') {
      cb(null, tls.createSecureContext({
        key: fs.readFileSync('example-key.pem'),
        cert: fs.readFileSync('example-cert.pem')
      }));
    } else {
      // Default certificate
      cb(null, tls.createSecureContext({
        key: fs.readFileSync('default-key.pem'),
        cert: fs.readFileSync('default-cert.pem')
      }));
    }
  }
};

// Example client options
const clientOptions = {
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),
  ca: [fs.readFileSync('ca-cert.pem')],
  
  servername: 'example.com',
  minVersion: 'TLSv1.2',
  
  // Custom identity check function
  checkServerIdentity: (hostname, cert) => {
    // Custom validation logic
    if (hostname !== cert.subject.CN) {
      return new Error(`Certificate CN does not match hostname: ${hostname}`);
    }
    return undefined; // No error
  },
  
  // Session reuse
  session: savedTlsSession, // Previously saved session
};