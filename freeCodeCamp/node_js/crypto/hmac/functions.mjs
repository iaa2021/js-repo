import crypto from 'crypto';
import fs from 'fs';
import {Buffer} from 'buffer';
function createSignature(message, key){
    const hmac = crypto.createHmac('sha256',key);
    hmac.update(message);
    return hmac.digest('hex');
}
function verifySignature(message, signature, key){
    const expSign = createSignature(message, key);
    return crypto.timingSafeEqual(
        Buffer.from(expSign, 'hex'),
        Buffer.from(signature, 'hex')
    ) 
}
export {createSignature, verifySignature};