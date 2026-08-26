import fs from 'fs';
import path from 'path';
import Stream from 'stream';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputFilePath = path.join(__dirname, 'input.txt');
const inputFilePath = path.join(__dirname, 'output.txt');
//console.log('File name: ', __filename, '\ndirname: ', __dirname);
//console.log('Output path: ', outputFilePath);
//create readable stream
const readInputFileStream = fs
.createReadStream(inputFilePath);
const writeOutputFileStream = fs
.createWriteStream(outputFilePath);
readInputFileStream.pipe(writeOutputFileStream);
writeOutputFileStream.on('finish', () => {
    console.log('All data have been written to file.');
});
writeOutputFileStream.on('error', (err) => {
    console.error('Error writing to file: ', err);
})