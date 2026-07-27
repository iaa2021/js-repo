import zlib from 'zlib';

// Create a custom dictionary with common terms
const dictionary = Buffer.from('username,password,email,first_name,last_name,created_at,updated_at,status,active,inactive,pending,admin,user,role,permissions');

// Sample data that benefits from the dictionary
const userData = JSON.stringify({
  username: 'johndoe',
  email: 'john@example.com',
  first_name: 'John',
  last_name: 'Doe',
  role: 'admin',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});

// Compress with and without dictionary
const compressedWithout = zlib.deflateSync(userData);
const compressedWith = zlib.deflateSync(userData, { dictionary });

console.log('Original size:', Buffer.byteLength(userData), 'bytes');
console.log('Compressed without dictionary:', compressedWithout.length, 'bytes');
console.log('Compressed with dictionary:', compressedWith.length, 'bytes');
console.log('Improvement:', Math.round((1 - (compressedWith.length / compressedWithout.length)) * 100) + '%');

// Decompress with dictionary
const decompressed = zlib.inflateSync(compressedWith, { dictionary });
console.log('Decompressed matches original:', decompressed.toString() === userData);