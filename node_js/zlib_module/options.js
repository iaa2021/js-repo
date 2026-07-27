import zlib from 'zlib';

const input = 'This is example content for compression with custom options.'.repeat(50);

// Test different compression levels
function testCompressionLevels() {
  console.log(`Original size: ${input.length} bytes`);
  
  // Default compression (level 6)
  zlib.gzip(input, (err, compressed) => {
    if (err) throw err;
    console.log(`Default compression (level 6): ${compressed.length} bytes`);
    
    // Fastest compression (level 1)
    zlib.gzip(input, { level: 1 }, (err, fastCompressed) => {
      if (err) throw err;
      console.log(`Fast compression (level 1): ${fastCompressed.length} bytes`);
      
      // Best compression (level 9)
      zlib.gzip(input, { level: 9 }, (err, bestCompressed) => {
        if (err) throw err;
        console.log(`Best compression (level 9): ${bestCompressed.length} bytes`);
      });
    });
  });
}

// Test compression with custom memory usage
function testMemoryLevels() {
  // Memory levels: 1 (lowest) to 9 (highest)
  zlib.gzip(input, { memLevel: 9 }, (err, compressed) => {
    if (err) throw err;
    console.log(`High memory usage (memLevel 9): ${compressed.length} bytes`);
    
    zlib.gzip(input, { memLevel: 4 }, (err, lowMemCompressed) => {
      if (err) throw err;
      console.log(`Low memory usage (memLevel 4): ${lowMemCompressed.length} bytes`);
    });
  });
}

// Run tests
testCompressionLevels();
setTimeout(testMemoryLevels, 1000); // Slight delay to separate console output