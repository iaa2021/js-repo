import crypto from 'crypto';
import { Buffer } from 'buffer';
import fs from 'fs';
function hashPassword(password){
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return {salt, hash};
}
function verifyPassword(password, hash, salt){
    const newHash = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(
        Buffer.from(hash, 'hex'),
        Buffer.from(newHash, 'hex')
    )
}
export {hashPassword, verifyPassword};