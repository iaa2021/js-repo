import crypto from 'crypto';
import { Buffer } from 'buffer';
import fs from 'fs';
import { decryptWithPrivateKey } from './functions.mjs';
const privateKey = fs.readFileSync('private_key.pem', 'utf-8');
const encryptedData = fs.readFileSync('encryptedData.txt', 'utf-8');
const decryptedData = decryptWithPrivateKey(privateKey, encryptedData);
console.log('Decrypted data: ', decryptedData);