import fs from 'fs';
import path from 'path';
//import Stream from 'stream';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import { pipeline } from 'stream';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
pipeline( fs.createReadStream('input.txt'),
zlib.createGzip(),
fs.createWriteStream('output2.txt.gz'), (err) =>{
    if(err){
        console.error('Pipeline failed: ', err); 
    } else { console.log('Success.') }
} );