import crypto from 'crypto';
import fs from 'fs';
import { Buffer } from 'buffer';

function encrypt(text, key){
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return {
        iv : iv.toString('hex'),
        authTag : authTag.toString('hex'),
        encryptedData : encrypted
    }
}
function decrypt(encryptedData, iv, key, authTag){
    const decipher = crypto.createDecipheriv('aes-256-gcm', key,
        Buffer.from(iv, 'hex')); 
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
function generateKey(password){
    const salt = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, salt, 32);
    fs.writeFile('key.txt', key.toString('hex'), (err) => {
        if(err){ throw err; }
        console.log('Key was written to file.');
    });
    return {key : key.toString('hex'), salt: salt.toString('hex')};
}
export { encrypt, decrypt, generateKey };