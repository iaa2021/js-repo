 function processArray(array, processFunction) {
  const chunkSize = 1000;
  let index = 0;

  function processChunk() {
    const chunk = array.slice(index, index + chunkSize);
    chunk.forEach(processFunction);

    index += chunkSize;

    if (index < array.length) {
      setTimeout(processChunk, 0); // Yield to the event loop
    } else {
      console.log('Processing complete');
    }
  }

  processChunk();
}

// Example usage
const bigArray = Array(10000).fill().map((_, i) => i);

console.log('Starting processing...');
processArray(bigArray, (item) => {
  // Simple processing
  if (item % 5000 === 0) {
    console.log(`Processed item ${item}`);
  }
});
console.log('This will log before processing completes');