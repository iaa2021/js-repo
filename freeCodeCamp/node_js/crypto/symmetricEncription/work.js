import crypto from 'crypto';
import { Buffer } from 'buffer';
import fs from 'fs';
import { encrypt, decrypt } from './functions.mjs';
const salt = crypto.randomBytes(16).toString('hex');
const password = 'myPassword';
const key = crypto.scryptSync(password, salt, 32);
const message = fs.readFileSync('myData.txt', 'utf-8');
const { iv, encryptedData } = encrypt(message, key);
fs.writeFile('myNewData.txt', encryptedData.toString('hex'), (err) => {
    if(err){ throw err; }
    console.log('Data has been written to file.');
})
console.log('iv: ', iv, '\nencrypted data: ', encryptedData);
const decrypted = decrypt(encryptedData, iv, key);
console.log(decrypted);