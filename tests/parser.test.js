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

test('Valid dice specification with drop highest (2d6dh+2)', () => {
  const result = parseDiceSpec('2d6dh+2');
  expect(result).toEqual([
    { type: 'dice', nDice: 2, nSides: 6, modifier: 'dh', raw: '2d6dh' },
    { type: 'modifier', value: 2, raw: '+2' }
  ]);
});

test('Valid dice specification with multiple dice rolls (2d6kl+1d4+3)', () => {
  const result = parseDiceSpec('2d6kl+1d4+3');
  expect(result).toEqual([
    { type: 'dice', nDice: 2, nSides: 6, modifier: 'kl', raw: '2d6kl' },
    { type: 'dice', nDice: 1, nSides: 4, modifier: '', raw: '+1d4' },
    { type: 'modifier', value: 3, raw: '+3' }
  ]);
});

test('Parses input with large dice count and sides (100d100)', () => {
    const result = parseDiceSpec('100d100');
    expect(result).toEqual([
        { type: 'dice', nDice: 100, nSides: 100, modifier: '', raw: '100d100' },
    ]);
});

test('Handles negative modifiers (-3)', () => {
    const result = parseDiceSpec('1d6-3');
    expect(result).toEqual([
        { type: 'dice', nDice: 1, nSides: 6, modifier: '', raw: '1d6' },
        { type: 'modifier', value: -3, raw: '-3' },
    ]);
});

test('Parses complex input with spaces (2d 6 kh + 3)', () => {
    const result = parseDiceSpec('2d 6 kh + 3');
    expect(result).toEqual([
        { type: 'dice', nDice: 2, nSides: 6, modifier: 'kh', raw: '2d6kh' },
        { type: 'modifier', value: 3, raw: '+3' },
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

test('Handles invalid dice specification (1d)', () => {
      const result = parseDiceSpec('1d');
      expect(result).toBeNull();
});

test('Handles invalid dice specification (d6)', () => {
    const result = parseDiceSpec('d6');
    expect(result).toBeNull();
});

test('Parses input with mixed valid and invalid parts (1d6+abc)', () => {
    const result = parseDiceSpec('1d6+abc');
    expect(result).toEqual([
        { type: 'dice', nDice: 1, nSides: 6, modifier: '', raw: '1d6' }, // not sure if this is desired behavior
    ]);
});
