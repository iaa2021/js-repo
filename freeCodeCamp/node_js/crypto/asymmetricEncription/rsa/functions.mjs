import crypto from 'crypto';
import { Buffer } from 'buffer';
import fs from 'fs';
function generateKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    fs.writeFileSync('public_key.pem', publicKey);
    fs.writeFileSync('private_key.pem', privateKey);
    console.log('Key pair generated and saved to files.');
}
function encryptWithPublicKey(publicKey, data){
    const bufferData = Buffer.from(data, 'utf-8');
    const encryptedData = crypto.publicEncrypt(
        {   key : publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        }, bufferData);
    return encryptedData.toString('base64');
}
function decryptWithPrivateKey(privateKey, encryptedData){
    const bufferEncryptedData = Buffer.from(encryptedData, 'base64');
    const decryptedData = crypto.privateDecrypt(
        {   key : privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        }, bufferEncryptedData);
    return decryptedData.toString('utf-8');
}
export { generateKeyPair, encryptWithPublicKey, decryptWithPrivateKey };