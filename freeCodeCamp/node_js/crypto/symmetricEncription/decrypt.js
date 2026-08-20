import crypto from 'crypto';
import { Buffer } from 'buffer';
import fs from 'fs';
import { decrypt } from './functions.mjs';
 
const data = fs.readFileSync('./myNewData.txt', 'utf-8');
const { iv, encryptedData } = JSON.parse(data);
console.log('Data have been retrieved.');
const key = Buffer.from(fs.readFileSync('key.txt', 'utf-8').trim(), 'hex');
console.log('key length: ', key.length, 'bytes');
const decryptedData = decrypt(encryptedData, iv, key);
fs.writeFile('./myDecryptedData.txt', decryptedData, (err) =>{
    if(err){ throw err; }
    console.log('Decrypted data have been written to file.');
} )