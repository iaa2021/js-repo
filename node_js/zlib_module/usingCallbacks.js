import zlib from 'zlib';

const input = 'This is some for compression with zlib module in Node.js.'.repeat(1000);

// Compress data using gzip
zlib.gzip(input, (err, compressed) => {
  if (err) {
    console.error('Compression error:', err);
    return;
  }
  const originalSize = Buffer.byteLength(input);
  //console.log('Original size:', input.length, 'bytes');
  console.log(`Original size: ${originalSize}, bytes`);
  console.log('Compressed size:', compressed.length, 'bytes');
  console.log('Compression ratio:', Math.round(100 - (compressed.length / input.length * 100)) + '%');
  
  // Decompress the data
  zlib.gunzip(compressed, (err, decompressed) => {
    if (err) {
      console.error('Decompression error:', err);
      return;
    }
    
    //console.log('Decompressed data:', decompressed.toString());
    console.log('Successfully decompressed:', input === decompressed.toString());
  });
});