import crypto from 'crypto';
import { Buffer } from 'buffer';
import fs from 'fs';

function encrypt(text, key){
    // create random initialization vector
    const iv = crypto.randomBytes(16);
    // create encrypter via aes-256-cbc
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    //encrypt data
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return { 
            iv : iv.toString('hex'),
            encryptedData : encrypted
            }
}
function decrypt( encryptedData, iv, key){
    //create decryptor
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    //decrypt data
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}
export { encrypt, decrypt};