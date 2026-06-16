import { Transform } from 'stream';
import { performance } from 'perf_hooks';

class ProcessingPipeline {
  constructor() {
    this.startTime = performance.now();
    this.processedItems = 0;
  }
  
  createTransformStream(transformFn) {
    return new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        try {
          const result = transformFn(chunk);
          this.processedItems++;
          callback(null, result);
        } catch (err) {
          callback(err);
        }
      }
    });
  }
  
  async processData(data, batchSize = 1000) {
    const batches = [];
    
    // Process in batches
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const processedBatch = await this.processBatch(batch);
      batches.push(processedBatch);
      
      // Log progress
      const progress = ((i + batchSize) / data.length * 100).toFixed(1);
      console.log(`Processed ${Math.min(i + batchSize, data.length)}/${data.length} (${progress}%)`);
    }
    
    return batches.flat();
  }
  
  processBatch(batch) {
    return new Promise((resolve) => {
      const results = [];
      
      // Create a transform stream for processing
      const processor = this.createTransformStream((item) => {
        // Simulate processing
        return {
          ...item,
          processed: true,
          timestamp: new Date().toISOString()
        };
      });
      
      // Collect results
      processor.on('data', (data) => {
        results.push(data);
      });
      
      processor.on('end', () => {
        resolve(results);
      });
      
      // Process each item in the batch
      for (const item of batch) {
        processor.write(item);
      }
      
      processor.end();
    });
  }
  
  getStats() {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    
    return {
      processedItems: this.processedItems,
      duration: `${duration.toFixed(2)}ms`,
      itemsPerSecond: (this.processedItems / (duration / 1000)).toFixed(2)
    };
  }
}

// Example usage
async function main() {
  // Generate test data
  const testData = Array(10000).fill().map((_, i) => ({
    id: i,
    value: Math.random() * 1000
  }));
  
  console.log('Starting data processing...');
  const pipeline = new ProcessingPipeline();
  
  // Process data in batches
  const result = await pipeline.processData(testData, 1000);
  
  // Print statistics
  console.log('Processing complete!');
  console.log('Statistics:', pipeline.getStats());
  console.log('Sample result:', result[0]);
}

main().catch(console.error);