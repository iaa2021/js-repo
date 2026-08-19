import crypto from 'crypto';
import { Buffer } from 'buffer';
import fs from 'fs';
const password = 'myStrongPassword';
const salt = crypto.randomBytes(16).toString('hex');
const key = crypto.scryptSync(password, salt, 32);
fs.writeFile('key.txt', key.toString('hex'), (err) =>{
    if(err){ throw err; }
    console.log('Key written to file.');
});
