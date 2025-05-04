import {resolveCollectorFromMap} from '../src';
import {MissingSymbolError} from '../src/errors/MissingSymbolError';
import {LoopDetectedError} from '../src/errors/LoopDetectedError';
import {ForkInPathError} from '../src/errors/ForkInPathError';
import {BrokenPathError} from '../src/errors/BrokenPathError';

describe('start validation rules', () => {
    it('should throw error if a map does not have an end symbol', () => {
        const collector = resolveCollectorFromMap(
            `
                @--A--+
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
                 @++
                  ++x
            `
        )
        expect(() => collector.collect()).toThrow(LoopDetectedError)
    })

    it('should throw fork in path error if path is forked', () => {
        const collector = resolveCollectorFromMap(
            `
                    x-B
                      |
               @--A---+
                      |
                 x+   C
                  |   |
                  +---+
            `
        )
        expect(() => collector.collect()).toThrow(ForkInPathError)
    })

    it.each([
        `
           @--A-+
                |
                 
                B-x
        `,
        `
           @- A-+
                |
                |
                B-x
        `,
    ])('should broken path error if path is broken', (input) => {
        const collector = resolveCollectorFromMap(input)
        expect(() => collector.collect()).toThrow(BrokenPathError)
    })
})
