import assert from 'assert';
import UserService from './user-service.js';

// Create a mock database
const mockDatabase = {
  findById: async (id) => {
    // Mock implementation returns test data
    if (id === 1) {
      return { id: 1, name: 'Alice', email: 'alice@example.com' };
    }
    return null;
  }
};

async function testUserService() {
  const userService = new UserService(mockDatabase);
  
  // Test successful retrieval
  const user = await userService.getUserById(1);
  assert.strictEqual(user.name, 'Alice', 'Should retrieve correct user name');
  
  // Test error handling
  try {
    await userService.getUserById(999);
    assert.fail('Should have thrown an error for non-existent user');
  } catch (error) {
    assert.strictEqual(error.message, 'User not found', 'Should throw user not found error');
  }
  
  console.log('UserService tests passed!');
}

testUserService().catch(err => {
  console.error('Test failed:', err);
});