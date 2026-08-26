import fs from 'fs';
import path from 'path';
import Stream from 'stream';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFilePath = path.join('input.txt');
//console.log('File name: ', __filename, '\ndirname: ', __dirname);
//create readable stream
const readInputFileStream = fs
.createReadStream(inputFilePath);
readInputFileStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
    console.log('\nReceived data: ', chunk.toString('utf-8'));
});