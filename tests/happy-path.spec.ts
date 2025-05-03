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
    it('should go straight trough intersection', () => {
        const collector = resolveCollectorFromMap(
            `
              @
              | +-C--+
              A |    |
              +---B--+
                |      x
                |      |
                +---D--+
            `
        )
        const {letters, path} = collector.collect()
        expect(letters).toBe('ABCD')
        expect(path).toBe('@|A+---B--+|+--C-+|-||+---D--+|x')
    })
    it('should collect letters on turns', () => {
        const collector = resolveCollectorFromMap(
            `
              @---A---+
                      |
              x-B-+   |
                  |   |
                  +---C
            `
        )
        const {letters, path} = collector.collect()
        expect(letters).toBe('ACB')
        expect(path).toBe('@---A---+|||C---+|+-B-x')
    })
    it('should not collect letters from same location twice', () => {
        const collector = resolveCollectorFromMap(
            `
                 +-O-N-+
                 |     |
                 |   +-I-+
             @-G-O-+ | | |
                 | | +-+ E
                 +-+     S
                         |
                         x
            `
        )
        const {letters, path} = collector.collect()
        expect(letters).toBe('GOONIES')
        expect(path).toBe('@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x')
    })
    it('should keep direction', () => {
        const collector = resolveCollectorFromMap(
            `
                 +-L-+
                 |  +A-+
                @B+ ++ H
                 ++    x
            `
        )
        const {letters, path} = collector.collect()
        expect(letters).toBe('BLAH')
        expect(path).toBe('@B+++B|+-L-+A+++A-+Hx')
    })
    it('should stop collecting after end symbol', () => {
        const collector = resolveCollectorFromMap(
            `
              @-A--+
                   |
                   +-B--x-C--D
            `
        )
        const {letters, path} = collector.collect()
        expect(letters).toBe('AB')
        expect(path).toBe('@-A--+|+-B--x')
    })
})
