import crypto from 'crypto';
import { Buffer } from 'buffer';
import fs from 'fs';
import { generateKeyPair, encryptWithPublicKey } from './functions.mjs';

generateKeyPair();
const publicKey = fs.readFileSync('public_key.pem', 'utf-8');
const dataToEncrypt = fs.readFileSync('myData.txt', 'utf-8');
const encryptedData = encryptWithPublicKey(publicKey, dataToEncrypt);
fs.writeFileSync('encryptedData.txt', encryptedData);
console.log('Data encrypted and saved to encryptedData.txt: ', encryptedData);