import crypto from 'crypto';
import { Buffer } from 'buffer';
import { decrypt } from './functions.mjs';
import fs from 'fs';
const keyHex = fs.readFileSync('key.txt', 'utf-8').trim();
const {encryptedData, iv, authTag} = JSON.parse(fs
    .readFileSync('encryptedData.json', 'utf-8'));
const decrypted = decrypt(encryptedData, iv, Buffer.from(keyHex, 'hex'), authTag);
console.log('Decrypted data:', decrypted);