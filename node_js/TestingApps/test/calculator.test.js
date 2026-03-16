import assert from "assert";
import { add, subtract } from "../calculator.js"

// Test the add function
assert.strictEqual(add(1, 2), 3, 'Addition not working correctly');
assert.strictEqual(add(-1, 1), 0, 'Addition with negative numbers not working');

// Test the subtract function
assert.strictEqual(subtract(5, 2), 3, 'Subtraction not working correctly');
assert.strictEqual(subtract(2, 5), -3, 'Subtraction resulting in negative not working');

console.log('All tests passed!');