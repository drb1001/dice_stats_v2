import { shiftDistribution, generateDistributions } from '../distribution.js';

test('Shift distribution positively', () => {
  const result = shiftDistribution([0, 0, 1, 2, 3], 2);
  expect(result).toEqual([0, 0, 0, 0, 1, 2, 3]);
});

test('Shift distribution negatively', () => {
  const result = shiftDistribution([0, 0, 1, 2, 3], -1);
  expect(result).toEqual([0, 1, 2, 3]);
});

test('No shift in distribution', () => {
  const result = shiftDistribution([1, 2, 3], 0);
  expect(result).toEqual([1, 2, 3]);
});


test('Generate distributions for valid specs', () => {
  const { dist1, dist2, groups1, groups2 } = generateDistributions('2d6', '1d4+2');
  expect(groups1).toEqual([
    { type: 'dice', nDice: 2, nSides: 6, modifier: '', raw: '2d6' }
  ]);
  expect(groups2).toEqual([
    { type: 'dice', nDice: 1, nSides: 4, modifier: '', raw: '1d4' },
    { type: 'modifier', value: 2, raw: '+2' }
  ]);
  expect(dist1.length).toBe(11); // Possible sums: 2 to 12
  expect(dist2.length).toBe(7); // Possible sums: 3 to 9
});

test('Generate distributions for invalid specs', () => {
  expect(() => generateDistributions('abc', '1d4')).toThrow('Invalid input! Examples: 2d6kh+3 or 2d4kh+4d2+2d6kh.');
});

import { generateDistributions } from '../distribution.js';
import { describe, it, expect } from 'jest';

describe('generateDistributions', () => {
  it('should generate correct distributions for valid inputs', () => {
    const spec1 = '2d6kh';
    const spec2 = '1d4';

    const { dist1, dist2, groups1, groups2 } = generateDistributions(spec1, spec2);

    expect(groups1).toBeDefined();
    expect(groups2).toBeDefined();
    expect(dist1).toBeInstanceOf(Array);
    expect(dist2).toBeInstanceOf(Array);
  });

  it('should throw an error for invalid inputs', () => {
    const invalidSpec = 'invalid';

    expect(() => generateDistributions(invalidSpec, '1d6')).toThrow('Invalid input!');
    expect(() => generateDistributions('1d6', invalidSpec)).toThrow('Invalid input!');
  });
});