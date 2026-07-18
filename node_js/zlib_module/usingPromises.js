import zlib from 'zlib';
import { promisify } from'util';

// Convert callback-based functions to promise-based
const gzipPromise = promisify(zlib.gzip);
const gunzipPromise = promisify(zlib.gunzip);

async function compressAndDecompress(input) {
  try {
    // Compress
    const compressed = await gzipPromise(input);
    console.log('Original size:', input.length, 'bytes');
    console.log('Compressed size:', compressed.length, 'bytes');
    
    // Decompress
    const decompressed = await gunzipPromise(compressed);
    //console.log('Decompressed data:', decompressed.toString());
    console.log('Success:', input === decompressed.toString());
    
    return compressed;
  } catch (err) {
    console.error('Error:', err);
  }
}

// Example usage
const testData = 'This is some test data for work with the zlib module.'.repeat(1000);
compressAndDecompress(testData);