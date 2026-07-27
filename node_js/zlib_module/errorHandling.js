import zlib from 'zlib';
import fs from 'fs';

// Function to safely decompress data
function safeDecompress(compressedData) {
  return new Promise((resolve, reject) => {
    zlib.gunzip(compressedData, { finishFlush: zlib.constants.Z_SYNC_FLUSH }, (err, result) => {
      if (err) {
        // Handle specific error types
        if (err.code === 'Z_DATA_ERROR') {
          reject(new Error('Invalid or corrupt compressed data'));
        } else if (err.code === 'Z_BUF_ERROR') {
          reject(new Error('Incomplete compressed data'));
        } else {
          reject(err);
        }
        return;
      }
      
      resolve(result);
    });
  });
}

// Example usage with error handling
async function demonstrateErrorHandling() {
  try {
    // Valid compression
    const validData = await zlib.gzipSync('This is valid data');
    console.log('Successfully compressed valid data');
    
    // Try to decompress valid data
    const result = await safeDecompress(validData);
    console.log('Successfully decompressed:', result.toString());
    
    // Try to decompress invalid data
    const invalidData = Buffer.from('This is not compressed data');
    await safeDecompress(invalidData);
    
  } catch (err) {
    console.error('Error occurred:', err.message);
  }
}

demonstrateErrorHandling();