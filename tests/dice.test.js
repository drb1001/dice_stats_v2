import { getDistribution } from '../dice.js';

test('Single die distribution (1d6)', () => {
  const result = getDistribution(1, 6);
  expect(result).toEqual([1/6, 1/6, 1/6, 1/6, 1/6, 1/6]);
});

test('Two dice distribution (2d4)', () => {
  const result = getDistribution(2, 4);
  expect(result).toEqual([0, 1/16, 2/16, 3/16, 4/16, 3/16, 2/16, 1/16]);
  expect(result.reduce((a, b) => a + b, 0)).toBeCloseTo(1); // Probabilities sum to 1
});

test('Two dice distribution (2d6)', () => {
  const result = getDistribution(2, 6);
  expect(result.length).toBe(12); // Max value is 12
  expect(result[0]).toBe(0);     // 0 chance for sum 1
  expect(result[1]).toBeCloseTo(1/36, 6); // 1/36 chance for sum 2
  expect(result[6]).toBeCloseTo(6/36, 6); // 6/36 chance for sum 7
  expect(result.reduce((a, b) => a + b, 0)).toBeCloseTo(1); // Probabilities sum to 1
});

test('Keep highest (2d6kh)', () => {
  const result = getDistribution(2, 6, 'kh');
  expect(result.length).toBe(6); // Possible highest values: 1 to 6
  expect(result.reduce((a, b) => a + b, 0)).toBeCloseTo(1); // Probabilities sum to 1
  expect(result[5]).toBeCloseTo(11/36, 6); // 11/36 chance for highest value 6
});