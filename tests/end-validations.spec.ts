import {resolveCollectorFromMap} from '../src';
import {MissingSymbolError} from '../src/errors/MissingSymbolError';
import {LoopDetectedError} from '../src/errors/LoopDetectedError';

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

    it('should throw loop detected error if a program would loop with no end', () => {
        const collector = resolveCollectorFromMap(
            `
                 @--++
                   x++
            `
        )
        expect(() => collector.collect()).toThrow(LoopDetectedError)
    })
})
