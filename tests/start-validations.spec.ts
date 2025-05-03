import {resolveCollectorFromMap} from '../src';
import {NoStartingSymbolError} from '../src/errors/NoStartingSymbolError';
import {MultipleStartingSymbolError} from '../src/errors/MultipleStartingSymbolError';
import {MultipleStartingPathsError} from '../src/errors/MultipleStartingPathsError';

describe('validation rules', () => {
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
