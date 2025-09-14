import { parseDiceSpec } from '..//js/parser.js';

test('Valid dice specification (2d12)', () => {
    const result = parseDiceSpec('2d12');
    expect(result).toEqual([
        { type: 'dice', nDice: 2, nSides: 12, modifier: '', raw: '2d12' }
    ]);
});

test('Valid dice specification (2d4+3)', () => {
  const result = parseDiceSpec('2d4+3');
  expect(result).toEqual([
    { type: 'dice', nDice: 2, nSides: 4, modifier: '', raw: '2d4' },
    { type: 'modifier', value: 3, raw: '+3' }
  ]);
});

test('Valid dice specification with keep highest (2d6kh+1)', () => {
  const result = parseDiceSpec('2d6kh+1');
  expect(result).toEqual([
    { type: 'dice', nDice: 2, nSides: 6, modifier: 'kh', raw: '2d6kh' },
    { type: 'modifier', value: 1, raw: '+1' }
  ]);
});

test('Invalid dice specification (abc)', () => {
  const result = parseDiceSpec('abc');
  expect(result).toBeNull();
});

test('Empty dice specification', () => {
  const result = parseDiceSpec('');
  expect(result).toBeNull();
});