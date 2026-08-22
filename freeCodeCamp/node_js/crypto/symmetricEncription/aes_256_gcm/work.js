import crypto from 'crypto';
import fs from 'fs';
import { Buffer } from 'buffer';
import { encrypt, decrypt } from './functions.mjs';
const keyHex = fs.readFileSync('key.txt', 'utf8').trim();
const key = Buffer.from(keyHex, 'hex');
console.log('Key length: ', key.length);
const message = fs.readFileSync('myData.txt', 'utf-8');
const { iv, encryptedData, authTag } = encrypt(message, key);
fs.writeFile('newData.txt', encryptedData, 'utf-8', (err) => {
    if(err){ throw err; }
    console.log('Data has been written to file.');
})
console.log('iv: ', iv, '\nencrypted: ', encryptedData,
    'authTag :', authTag);
const decrypted = decrypt(encryptedData, iv, key, authTag);
console.log('Decrypted data:', decrypted);