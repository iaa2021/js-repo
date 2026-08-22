import crypto, { randomBytes } from 'crypto';
import fs from 'fs';
import { Buffer } from 'buffer';

const password = 'myStrongPassword';
const salt = randomBytes(16);
const key = crypto.scryptSync(password, salt, 32);
fs.writeFile('key.txt', key.toString('hex'), (err) => {
    if(err){ throw err; }
    console.log('Key was written to file.');
})