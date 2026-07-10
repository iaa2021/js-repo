import tls from 'tls';
import fs from 'fs';

// Custom verification function
function validateCertificate(cert) {
  // Basic certificate info
  console.log('Certificate subject:', cert.subject);
  console.log('Certificate issuer:', cert.issuer);
  console.log('Valid from:', cert.valid_from);
  console.log('Valid to:', cert.valid_to);
  
  // Check certificate validity period
  const now = new Date();
  const validFrom = new Date(cert.valid_from);
  const validTo = new Date(cert.valid_to);
  
  if (now < validFrom || now > validTo) {
    return { valid: false, reason: 'Certificate is not within its validity period' };
  }
  
  // Additional checks could include:
  // - Certificate revocation status
  // - Certificate chain validation
  // - Public key strength
  
  return { valid: true };
}

// Create TLS client with custom validation
const options = {
  ca: [fs.readFileSync('ca-cert.pem')],
  checkServerIdentity: (hostname, cert) => {
    // First check the certificate against our custom rules
    const validationResult = validateCertificate(cert);
    
    if (!validationResult.valid) {
      return new Error(validationResult.reason);
    }
    
    // Then verify the hostname matches the certificate
    const certCN = cert.subject.CN;
    
    if (hostname !== certCN &&
        !cert.subjectaltname ||
        !cert.subjectaltname.includes(hostname)) {
      return new Error(`Certificate name mismatch: ${hostname} !== ${certCN}`);
    }
    
    // Certificate is valid
    return undefined;
  }
};

// Connect to server with custom verification
const client = tls.connect(8000, 'example.com', options, () => {
  if (client.authorized) {
    console.log('Connection authorized');
    client.write('Secure message');
  } else {
    console.log('Connection not authorized:', client.authorizationError);
  }
});

// Handle connection events
client.on('error', (error) => {
  console.error('TLS error:', error);
});

client.on('end', () => {
  console.log('Connection ended');
});