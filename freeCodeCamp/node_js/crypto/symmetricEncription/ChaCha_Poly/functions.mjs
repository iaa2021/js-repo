import crypto from 'crypto';
import { Buffer } from 'buffer';
import fs from 'fs';
function generateKey(password) {
    const salt = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, salt, 32);
    fs.writeFileSync('key.txt', key.toString('hex'));
    return { key, salt };
}
function encrypt(plaintext, key) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('chacha20-poly1305', key, iv,
        { authTagLength: 16 });
    const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return {
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex'),
        encryptedData: encrypted.toString('hex')
    };
}
function decrypt(encryptedData, iv, key, authTag) {
    const decipher = crypto.createDecipheriv('chacha20-poly1305', key,
         Buffer.from(iv, 'hex'), { authTagLength: 16 });
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedData, 'hex')),
        decipher.final()
    ]);
    return decrypted.toString();
}
export { generateKey, encrypt, decrypt };