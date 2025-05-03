import {resolveCollectorFromMap} from '../src';
import {MissingSymbolError} from '../src/errors/MissingSymbolError';

describe('happy path', () => {
    it('should collect letters according to path', () => {
        const collector = resolveCollectorFromMap(
            `
              @---A---+
                      |
              x-B-+   C
                  |   |
                  +---+
            `
        )
        const {letters, path} = collector.collect()
        expect(letters).toBe('ACB')
        expect(path).toBe('@---A---+|C|+---+|+-B-x')
    })
})
