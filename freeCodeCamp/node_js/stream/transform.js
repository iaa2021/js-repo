import {Transform} from 'stream';
import fs from 'fs';

class upperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        const upperCaseChunk = chunk.toString().toUpperCase();
        this.push(upperCaseChunk);
        callback();
    }
}

const upperCaseStream = new upperCaseTransform();
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('outputUpperCase.txt');


readStream.pipe(upperCaseStream).pipe(writeStream)
.on('finish', () => {
    console.log('Finished writing to outputUpperCase.txt');
});;
