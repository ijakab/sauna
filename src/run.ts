import {resolveCollectorFromMap} from './index';

function main() {
    const input = `
             +-O-N-+
             |     |
             |   +-I-+
         @-G-O-+ | | |
             | | +-+ E
             +-+     S
                     |
                     x
    `

    const collector = resolveCollectorFromMap(input)
    const {letters, path} = collector.collect()

    console.log('LETTERS:', letters)
    console.log('PATH:', path)
}

try {
    main()
} catch (error) {
    console.error('Error happened during runtime')
    console.error(error)
    process.exit(1)
}
