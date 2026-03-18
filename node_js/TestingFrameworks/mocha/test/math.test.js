import { expect } from 'chai';
import { sum, divide } from '../utils/math.js';

describe('Math Utilities', () => {
  describe('sum()', () => {
    it('should return the sum of two numbers', () => {
      expect(sum(1, 2)).to.equal(3);
      expect(sum(-1, 1)).to.equal(0);
    });

    it('should throw error for non-number inputs', () => {
      expect(() => sum('1', 2)).to.throw('Both arguments must be numbers');
    });
  });

  describe('divide()', () => {
    it('should divide two numbers correctly', () => {
      expect(divide(10, 2)).to.equal(5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).to.throw('Division by zero');
    });
  });
});