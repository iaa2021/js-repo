import crypto from "crypto";

// A key must match the algorithm length. Here AES-256 is 32 bytes
const key = Buffer.from("12345678901234567890123456789012");

// A fixed IV, 16 bytes for AES
const iv = Buffer.from("1234567890123456");

const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

let encrypted = cipher.update("Hello campers!", "utf8", "hex");
encrypted += cipher.final("hex");

console.log("Encrypted data:", encrypted);
// Encrypted data: 4ee93aa398ab44e3540e4a67ca96bc8c

// Decrypt the "Hello campers!" message
const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");

console.log("Decrypted data:", decrypted);
// Decrypted data: Hello campers!