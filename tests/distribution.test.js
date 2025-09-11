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
  expect(dist1.length).toBe(12); // Max possible sum with 2d6 is 12
  expect(dist2.length).toBe(6); // Max possible sum with 1d4+2 is 6
});

test('Generate distributions for invalid specs', () => {
  expect(() => generateDistributions('abc', '1d4')).toThrow('Invalid input! Examples: 2d6kh+3 or 2d4kh+4d2+2d6kh.');
});
