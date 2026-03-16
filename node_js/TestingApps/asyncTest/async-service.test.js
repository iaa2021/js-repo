import assert from 'assert';
import AsyncService from './async-service.js';

async function testAsyncService() {
  const service = new AsyncService();
  
  // Test fetchData
  const fetchResult = await service.fetchData();
  assert.strictEqual(fetchResult.status, 'success', 'Should return success status');
  assert.deepStrictEqual(fetchResult.data, [1, 2, 3], 'Should return correct data array');
  
  // Test processData
  const processResult = await service.processData();
  assert.deepStrictEqual(processResult, [2, 4, 6], 'Should double each value in the array');
  
  console.log('AsyncService tests passed!');
}

testAsyncService().catch(err => {
  console.error('Test failed:', err);
});