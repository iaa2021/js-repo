const assert = require('assert');

async function asyncTest() {
  // Function that returns a rejecting promise
  function failingAsyncFunction() {
    return Promise.reject(new Error('Async error'));
  }

  // This will pass
  await assert.rejects(
    failingAsyncFunction(),
    /Async error/
  );

  // This will also pass
  await assert.rejects(
    async () => {
      throw new Error('Async function error');
    },
    {
      name: 'Error',
      message: 'Async function error'
    }
  );

  try {
    // This will throw an AssertionError
    await assert.rejects(
      Promise.resolve('success'),
      'Expected promise to reject'
    );
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

// Run the async test
asyncTest().catch(err => console.error(`Unhandled error: ${err.message}`));