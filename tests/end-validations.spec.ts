import {resolveCollectorFromMap} from '../src';
import {MissingSymbolError} from '../src/errors/MissingSymbolError';

describe('start validation rules', () => {
    it('should throw error if a map does not have an end symbol', () => {
        const collector = resolveCollectorFromMap(
            `
                 -A---+
                      |
              --B-+   C
                  |   |
                  +---+
            `
        )
        expect(() => collector.collect()).toThrow(MissingSymbolError)
    })

    it.skip('should throw loop detected error if a program would loop with no end', () => {
        const collector = resolveCollectorFromMap(
            `
                 @--++
                   x++
            `
        )
        expect(() => collector.collect()).toThrow(MissingSymbolError)
    })
})
