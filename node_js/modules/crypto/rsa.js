const crypto = require('crypto');

// Generate RSA key pair
function generateKeyPair() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Key size in bits
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });
}

// Encrypt with public key
function encryptWithPublicKey(text, publicKey) {
  const buffer = Buffer.from(text, 'utf8');
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    buffer
  );
  return encrypted.toString('base64');
}

// Decrypt with private key
function decryptWithPrivateKey(encryptedText, privateKey) {
  const buffer = Buffer.from(encryptedText, 'base64');
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    buffer
  );
  return decrypted.toString('utf8');
}

// Generate keys
const { publicKey, privateKey } = generateKeyPair();
console.log('Public Key:', publicKey.substring(0, 50) + '...');
console.log('Private Key:', privateKey.substring(0, 50) + '...');

// Example usage
const message = 'This message is encrypted with RSA';
const encrypted = encryptWithPublicKey(message, publicKey);
console.log('Encrypted:', encrypted.substring(0, 50) + '...');

const decrypted = decryptWithPrivateKey(encrypted, privateKey);
console.log('Decrypted:', decrypted);