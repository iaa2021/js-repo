import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

// Compress a file
function compressFile(inputPath) {
  const outputPath = inputPath + '.gz';
  
  // Create read and write streams
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);
  
  // Create gzip transform stream
  const gzip = zlib.createGzip();
  
  // Pipe data through the compression stream
  input.pipe(gzip).pipe(output);
  
  // Handle events
  input.on('error', (err) => console.error('Input error:', err));
  gzip.on('error', (err) => console.error('Compression error:', err));
  output.on('error', (err) => console.error('Output error:', err));
  
  output.on('finish', () => {
    console.log(`File compressed successfully: ${outputPath}`);
    
    // Get file sizes for comparison
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    
    console.log(`Original size: ${inputStats.size} bytes`);
    console.log(`Compressed size: ${outputStats.size} bytes`);
    console.log(`Compression ratio: ${Math.round(100 - (outputStats.size / inputStats.size * 100))}%`);
  });
}

// Decompress a file
function decompressFile(inputPath) {
  // Remove .gz extension for output path
  const outputPath = inputPath.endsWith('.gz')
    ? inputPath.slice(0, -3)
    : inputPath + '.uncompressed';
  
  // Create streams
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);
  const gunzip = zlib.createGunzip();
  
  // Pipe data through decompression stream
  input.pipe(gunzip).pipe(output);
  
  // Handle events
  input.on('error', (err) => console.error('Input error:', err));
  gunzip.on('error', (err) => console.error('Decompression error:', err));
  output.on('error', (err) => console.error('Output error:', err));
  
  output.on('finish', () => {
    console.log(`File decompressed successfully: ${outputPath}`);
    decompressFile(outputPath);
  });
}

// Example usage (assuming you have a text file)
compressFile('example.txt');
decompressFile('example.txt.gz');

// Note: Uncomment the above lines to actually run the compression/decompression
console.log('This example shows how to compress and decompress files using streams.');
console.log('Create a text file named "example.txt" and uncomment the function calls to test.');