import tls from 'tls';
import fs from 'fs';
import crypto from 'crypto';

// Load CRL (Certificate Revocation List)
const crl = fs.readFileSync('ca-cert.pem');

// Parse CRL to check against
const checkRevocation = (cert) => {
  // In a real application, you would parse the CRL and check
  // if the certificate's serial number is in the revocation list
  
  // For demonstration, we'll just check against a known revoked serial
  const revokedSerials = [
    '0123456789ABCDEF', // Example revoked serial
    'FEDCBA9876543210'
  ];
  
  const certInfo = crypto.certificateVerify(
    cert.raw,
    'sha256',
    Buffer.from(''),
    Buffer.from('')
  );
  
  return !revokedSerials.includes(certInfo.serialNumber.toString('hex').toUpperCase());
};

const server = tls.createServer({
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  requestCert: true,
  rejectUnauthorized: true,
  
  // Custom certificate validation
  checkServerIdentity: (host, cert) => {
    if (!checkRevocation(cert)) {
      return new Error('Certificate has been revoked');
    }
    return undefined; // No error means certificate is valid
  }
}, (socket) => {
  // Handle connection
  console.log('Client connected:', socket.authorized ? 'Authorized' : 'Unauthorized');
  socket.end('Hello secure world!\n');
});

server.listen(8000);