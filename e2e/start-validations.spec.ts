import {resolveCollectorFromMap} from '../src';
import {NoStartingSymbolError} from '../src/errors/NoStartingSymbolError';
import {MultipleStartingSymbolError} from '../src/errors/MultipleStartingSymbolError';
import {MultipleStartingPathsError} from '../src/errors/MultipleStartingPathsError';
import {InvalidCharacterError} from '../src/errors/InvalidCharacterError';

describe('start validation rules', () => {
    it('should throw error if an unexpected symbol is encountered', () => {
        expect(() => resolveCollectorFromMap(
            `
                 @-A--+
                      |
              x-B-+   C
                  |   ^
                  +---+
            `
        )).toThrow(InvalidCharacterError)
        // in a real world we would test more edge cases for the char validation
    });
    it('should throw error if a map does not have a starting point', () => {
        const collector = resolveCollectorFromMap(
            `
                 -A---+
                      |
              x-B-+   C
                  |   |
                  +---+
            `
        )
        expect(() => collector.collect()).toThrow(NoStartingSymbolError)
    });
    it('should throw error if a map has multiple starting points', () => {
        const collector = resolveCollectorFromMap(
            `
                 @----+
                      |
              @-B-+   C
                  |   |
                  +-x-+
            `
        )
        expect(() => collector.collect()).toThrow(MultipleStartingSymbolError)
    });
    it('should throw error if a map has multiple starting paths', () => {
        const collector = resolveCollectorFromMap(
            `
                 -----+
                      |
              -B-+    @
                  |   |
                  +-x-+
            `
        )
        expect(() => collector.collect()).toThrow(MultipleStartingPathsError)
    });
});
