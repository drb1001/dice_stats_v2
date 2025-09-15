import { shiftDistribution, processGroups, generateDistributions } from '..//js/distribution.js';

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

test('Process single group (2d10)', () => {
  const groups = [
    { type: 'dice', nDice: 2, nSides: 10, modifier: '', raw: '2d6' }
  ];
  const result = processGroups(groups);
  expect(result.length).toBe(21); // Max possible sum with 2d10 is 20, so 21 elements including 0
  expect(result[0]).toBe(0);
  expect(result[3]).toBeCloseTo(2/100, 6); // 2/100 chance for value 3
  expect(result.reduce((a, b) => a + b, 0)).toBeCloseTo(1); // Probabilities sum to 1
});

test('Process multiple groups (2d6+1d4+10)', () => {
  const groups = [
    { type: 'dice', nDice: 2, nSides: 6, modifier: '', raw: '2d6' },
    { type: 'dice', nDice: 1, nSides: 4, modifier: '', raw: '1d4' },
    { type: 'modifier', value: 10, raw: '+10' }
  ];
  const result = processGroups(groups);
  expect(result.length).toBe(27); // Max possible sum with 2d6+1d4+10 is 26, so 27 elements including 0
  expect(result[0]).toBe(0);
  expect(result[11]).toBe(0);
  expect(result[13]).toBeCloseTo(1/(6*6*4), 6); // 1/6*1/6*1/4 chance for value 13
  expect(result[26]).toBeCloseTo(1/(6*6*4), 6); // 1/6*1/6*1/4 chance for value 13
  expect(result.reduce((a, b) => a + b, 0)).toBeCloseTo(1); // Probabilities sum to 1

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
  expect(dist1.length).toBe(13); // Max possible sum with 2d6 is 12, so 13 elements including 0
  expect(dist2.length).toBe(7); // Max possible sum with 1d4+2 is 6, so 7 elements including 0
});

test('Generate distributions for invalid specs', () => {
  expect(() => generateDistributions('abc', '1d4')).toThrow('Invalid input! Examples: 2d6kh+3 or 2d4kh+4d2+2d6kh.');
});

