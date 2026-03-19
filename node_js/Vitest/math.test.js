import { describe, it, expect } from 'vitest';
import { sum, divide } from './math.js';

describe('Math Utilities', () => {
  it('should add numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('should throw error for invalid inputs', () => {
    expect(() => sum('1', 2)).toThrow('Both arguments must be numbers');
  });
});