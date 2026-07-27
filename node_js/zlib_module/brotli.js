import zlib from 'zlib';

// Sample data to compress
const input = 'This is some test data that will be compressed with different algorithms for comparison.'.repeat(20);

// Compare compression methods
function compareCompression() {
  console.log(`Original data size: ${input.length} bytes`);
  
  // Gzip compression
  zlib.gzip(input, (err, gzipped) => {
    if (err) {
      console.error('Gzip error:', err);
      return;
    }
    
    console.log(`Gzip size: ${gzipped.length} bytes (${Math.round(100 - (gzipped.length / input.length * 100))}% reduction)`);
    
    // Deflate compression
    zlib.deflate(input, (err, deflated) => {
      if (err) {
        console.error('Deflate error:', err);
        return;
      }
      
      console.log(`Deflate size: ${deflated.length} bytes (${Math.round(100 - (deflated.length / input.length * 100))}% reduction)`);
      
      // Brotli compression (if available)
      if (typeof zlib.brotliCompress === 'function') {
        zlib.brotliCompress(input, (err, brotli) => {
          if (err) {
            console.error('Brotli error:', err);
            return;
          }
          
          console.log(`Brotli size: ${brotli.length} bytes (${Math.round(100 - (brotli.length / input.length * 100))}% reduction)`);
        });
      } else {
        console.log('Brotli compression not available in this Node.js version');
      }
    });
  });
}

// Run the comparison
compareCompression();