import zlib from 'zlib';

// Sample data with repeated patterns (good for RLE)
const repeatedData = 'ABC'.repeat(1000);

// Test different compression strategies
function testStrategies(data) {
  const strategies = [
    { name: 'DEFAULT_STRATEGY', value: zlib.constants.Z_DEFAULT_STRATEGY },
    { name: 'FILTERED', value: zlib.constants.Z_FILTERED },
    { name: 'HUFFMAN_ONLY', value: zlib.constants.Z_HUFFMAN_ONLY },
    { name: 'RLE', value: zlib.constants.Z_RLE },
    { name: 'FIXED', value: zlib.constants.Z_FIXED }
  ];
  
  console.log(`Original size: ${data.length} bytes`);
  
  strategies.forEach(({ name, value }) => {
    const compressed = zlib.gzipSync(data, { strategy: value });
    console.log(`${name.padEnd(20)}: ${compressed.length.toString().padEnd(5)} bytes`);
  });
}

testStrategies(repeatedData);