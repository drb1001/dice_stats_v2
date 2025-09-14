import { parseDiceSpec } from '../js/ui.js';

describe('parseDiceSpec', () => {
    test('Parses single dice specification (1d6)', () => {
        const result = parseDiceSpec('1d6');
        expect(result).toEqual([
            { type: 'dice', nDice: 1, nSides: 6, modifier: '', raw: '1d6' },
        ]);
    });

    test('Parses dice with modifier (2d6kh)', () => {
        const result = parseDiceSpec('2d6kh');
        expect(result).toEqual([
            { type: 'dice', nDice: 2, nSides: 6, modifier: 'kh', raw: '2d6kh' },
        ]);
    });

    test('Parses dice with addition (1d6+3)', () => {
        const result = parseDiceSpec('1d6+3');
        expect(result).toEqual([
            { type: 'dice', nDice: 1, nSides: 6, modifier: '', raw: '1d6' },
            { type: 'modifier', value: 3, raw: '+3' },
        ]);
    });

    test('Parses multiple dice specifications (2d4+4d6kh+5)', () => {
        const result = parseDiceSpec('2d4+4d6kh+5');
        expect(result).toEqual([
            { type: 'dice', nDice: 2, nSides: 4, modifier: '', raw: '2d4' },
            { type: 'dice', nDice: 4, nSides: 6, modifier: 'kh', raw: '4d6kh' },
            { type: 'modifier', value: 5, raw: '+5' },
        ]);
    });

    test('Handles invalid input gracefully (empty string)', () => {
        const result = parseDiceSpec('');
        expect(result).toBeNull();
    });

    test('Handles invalid input gracefully (nonsense string)', () => {
        const result = parseDiceSpec('abc123');
        expect(result).toBeNull();
    });

    test('Handles negative modifiers (-3)', () => {
        const result = parseDiceSpec('1d6-3');
        expect(result).toEqual([
            { type: 'dice', nDice: 1, nSides: 6, modifier: '', raw: '1d6' },
            { type: 'modifier', value: -3, raw: '-3' },
        ]);
    });

    test('Parses complex input with spaces (2d6 kh + 3)', () => {
        const result = parseDiceSpec('2d6 kh + 3');
        expect(result).toEqual([
            { type: 'dice', nDice: 2, nSides: 6, modifier: 'kh', raw: '2d6kh' },
            { type: 'modifier', value: 3, raw: '+3' },
        ]);
    });

    test('Parses input with multiple modifiers (1d6+3-2)', () => {
        const result = parseDiceSpec('1d6+3-2');
        expect(result).toEqual([
            { type: 'dice', nDice: 1, nSides: 6, modifier: '', raw: '1d6' },
            { type: 'modifier', value: 3, raw: '+3' },
            { type: 'modifier', value: -2, raw: '-2' },
        ]);
    });

    test('Parses input with negative dice count (-1d6)', () => {
        const result = parseDiceSpec('-1d6');
        expect(result).toEqual([
            { type: 'dice', nDice: -1, nSides: 6, modifier: '', raw: '-1d6' },
        ]);
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
        expect(result).toBeNull();
    });

    test('Parses input with large dice count and sides (100d100)', () => {
        const result = parseDiceSpec('100d100');
        expect(result).toEqual([
            { type: 'dice', nDice: 100, nSides: 100, modifier: '', raw: '100d100' },
        ]);
    });
});