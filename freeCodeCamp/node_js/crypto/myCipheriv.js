import crypto from 'crypto';
import fs from 'fs';
import {Buffer} from 'buffer';
const keyValue = crypto.randomBytes(32);
const ivValue = crypto.randomBytes(16);
const key = Buffer.from(keyValue);
const iv = Buffer.from(ivValue);
fs.writeFile('myKey.txt', key.toString('hex'), (err) => {
    if (err) throw err;
    console.log('Key written to file');
    });
fs.writeFile('myIv.txt', iv.toString('hex'), (err) => {
    if (err) throw err;
    console.log('IV written to file');
    });
const data = fs.readFileSync('myData.txt', 'utf8');
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update(data, 'utf8','hex');
encrypted += cipher.final('hex');
console.log('Encrypted data:', encrypted);
let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('Decrypted data:', decrypted);
fs.writeFile('myEncryptedData.txt', encrypted, (err) => {
  if (err) throw err;
  console.log('Encrypted data written to file');
});