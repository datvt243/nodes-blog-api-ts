import { convertTime } from '@/utils/helper';

describe('function convertTime()', () => {
    test('should return Date object for a valid date String', () => {
        const _dateString = '2024-09-10';
        const _result = convertTime(_dateString);
        expect(_result).toBeInstanceOf(Date);
        expect(_result).toEqual(new Date(_dateString));
    });
    test('should return Date object for a valid date Number', () => {
        const _timestamp = 1694323200000; // +'2024-09-10'
        const _result = convertTime(_timestamp);
        expect(_result).toBeInstanceOf(Date);
        expect(_result).toEqual(new Date(_timestamp));
    });

    test('should return "--/--" for non-format string', () => {
        expect(convertTime('string non-format')).toBe('--/--');
    });
    test('should return "--/--" for an Object', () => {
        expect(convertTime({} as any)).toBe('--/--');
    });
    test('should return "--/--" for an Array', () => {
        expect(convertTime([] as any)).toBe('--/--');
    });
    test('should return "--/--" for Null', () => {
        expect(convertTime(null as any)).toBe('--/--');
    });
});
