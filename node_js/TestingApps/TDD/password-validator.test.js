// 1. Write the test first
import assert from "assert";
import validatePassword from './password-validator.js';

// Test for password length
assert.strictEqual(validatePassword('abc12'), false, 'Should reject passwords shorter than 8 characters');
assert.strictEqual(validatePassword('abcdef123'), true, 'Should accept passwords 8+ characters long');

// Test for number requirement
assert.strictEqual(validatePassword('abcdefgh'), false, 'Should reject passwords without numbers');
assert.strictEqual(validatePassword('abcdefg1'), true, 'Should accept passwords with numbers');

console.log('All password validation tests passed!');

// 2. Run the test - it will fail because validatePassword doesn't exist yet