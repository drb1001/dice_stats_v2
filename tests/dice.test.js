import { getDistribution } from '../dice.js';

test('Single die distribution (1d6)', () => {
  const result = getDistribution(1, 6);
  expect(result).toEqual([0, 1/6, 1/6, 1/6, 1/6, 1/6, 1/6]);
});

test('Two dice distribution (2d4)', () => {
  const result = getDistribution(2, 4);
  expect(result).toEqual([0, 0, 1/16, 2/16, 3/16, 4/16, 3/16, 2/16, 1/16]);
  expect(result.reduce((a, b) => a + b, 0)).toBeCloseTo(1); // Probabilities sum to 1
});

test('Two dice distribution (2d6)', () => {
  const result = getDistribution(2, 6);
  expect(result.length).toBe(13); // Max value is 12, so 13 elements including 0
  expect(result[0]).toBe(0);     // 0 chance for sum 0
  expect(result[1]).toBe(0);     // 0 chance for sum 1
  expect(result[2]).toBeCloseTo(1/36, 6); // 1/36 chance for sum 2
  expect(result[7]).toBeCloseTo(6/36, 6); // 6/36 chance for sum 7
  expect(result.reduce((a, b) => a + b, 0)).toBeCloseTo(1); // Probabilities sum to 1
});

test('Keep highest (2d6kh)', () => {
  const result = getDistribution(2, 6, 'kh');
  expect(result.length).toBe(7); // Max value is 6, so 7 elements including 0
  expect(result[0]).toBe(0);
  expect(result[6]).toBeCloseTo(11/36, 6); // 11/36 chance for value 6
  expect(result.reduce((a, b) => a + b, 0)).toBeCloseTo(1); // Probabilities sum to 1

});

test('3 dice distribution (3d6)', () => {
  const result = getDistribution(3, 6);
  expect(result.length).toBe(19); // Max value is 18, so 19 elements including 0
  expect(result[0]).toBe(0);     // 0 chance for sum 0
  expect(result[1]).toBe(0);     // 0 chance for sum 1
  expect(result[2]).toBe(0);     // 0 chance for sum 2
  expect(result[3]).toBeCloseTo(1/(6*6*6), 6); // 1/6^3 chance for value 3
  expect(result.reduce((a, b) => a + b, 0)).toBeCloseTo(1); // Probabilities sum to 1
});