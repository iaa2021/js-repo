// Create a string
const str = 'Hello, World!';

// Convert to different encodings
const utf8Buffer = Buffer.from(str, 'utf8');
console.log('UTF-8:', utf8Buffer);

const base64Str = utf8Buffer.toString('base64');
console.log('Base64 string:', base64Str);

const hexStr = utf8Buffer.toString('hex');
console.log('Hex string:', hexStr);

// Convert back to original
const fromBase64 = Buffer.from(base64Str, 'base64').toString('utf8');
console.log('From Base64:', fromBase64);

const fromHex = Buffer.from(hexStr, 'hex').toString('utf8');
console.log('From Hex:', fromHex);
