const crypto = require('crypto');

// Generate RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// Function to sign a message
function signMessage(message, privateKey) {
  const signer = crypto.createSign('sha256');
  signer.update(message);
  return signer.sign(privateKey, 'base64');
}

// Function to verify a signature
function verifySignature(message, signature, publicKey) {
  const verifier = crypto.createVerify('sha256');
  verifier.update(message);
  return verifier.verify(publicKey, signature, 'base64');
}

// Example usage
const message = 'This message needs to be signed';
const signature = signMessage(message, privateKey);
console.log('Message:', message);
console.log('Signature:', signature.substring(0, 50) + '...');

// Verify the signature
const isValid = verifySignature(message, signature, publicKey);
console.log('Signature valid:', isValid); // true

// Verify with a modified message
const isInvalid = verifySignature('Modified message', signature, publicKey);
console.log('Modified message valid:', isInvalid); // false