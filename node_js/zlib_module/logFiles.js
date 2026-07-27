import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

// Compress log files and add timestamp
function compressLogFile(logFilePath) {
  // Generate output path with timestamp
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const basename = path.basename(logFilePath);
  const outputPath = path.join(
    path.dirname(logFilePath),
    `${basename}-${timestamp}.gz`
  );
  
  // Create streams
  const input = fs.createReadStream(logFilePath);
  const output = fs.createWriteStream(outputPath);
  const gzip = zlib.createGzip();
  
  // Pipe the streams
  input.pipe(gzip).pipe(output);
  
  // Handle events
  output.on('finish', () => {
    console.log(`Log file compressed: ${outputPath}`);
    
    // Optionally, clear the original log file
    fs.writeFile(logFilePath, '', err => {
      if (err) {
        console.error(`Error clearing log file: ${err.message}`);
      } else {
        console.log(`Original log file cleared: ${logFilePath}`);
      }
    });
  });
  
  input.on('error', err => console.error(`Read error: ${err.message}`));
  gzip.on('error', err => console.error(`Compression error: ${err.message}`));
  output.on('error', err => console.error(`Write error: ${err.message}`));
}

// Example usage
 compressLogFile('server.log');

// Note: Uncomment the line above to compress an actual log file
console.log('This example shows how to compress log files with timestamps.');