import crypto from 'crypto';
import { Buffer } from 'buffer';
import fs from 'fs';
import { encrypt } from './functions.mjs';

const data = fs.readFileSync('./myData.txt', 'utf-8');
console.log('Data have been retrieved.');
const key = Buffer.from(fs.readFileSync('key.txt', 'utf-8').trim(), 'hex');
console.log('key length: ', key.length, 'bytes');
const{ iv, encryptedData } = encrypt(data, key);
const result = {
    iv, encryptedData 
}
fs.writeFile('./myNewData.txt', 
    JSON.stringify(result, null, 2)
    , (err) =>{
    if(err){ throw err; }
    console.log('Encrypted data have been written to file.');
} )