import crypto from 'crypto';
import { Buffer } from 'buffer';
import { decrypt, deriveKey } from './functions.mjs';
import fs from 'fs';
const password = 'myStrongPassword';
const salt = fs.readFileSync('salt.txt', 'utf-8').trim();
const keyHex = deriveKey(password, salt);
const {encryptedData, iv, authTag} = JSON.parse(fs
    .readFileSync('encryptedData.json', 'utf-8'));
const decrypted = decrypt(encryptedData, iv, Buffer.from(keyHex, 'hex'), authTag);
console.log('Decrypted data:', decrypted);