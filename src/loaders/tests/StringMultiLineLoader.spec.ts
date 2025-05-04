// StringMultiLineLoader also uses StringArray loader so they are both tested
// in a real scenario we might test both, but to save some time I only did one
import {StringMultiLineLoader} from '../StringMultiLineLoader';

describe('StringMultiLineLoader', () => {
    it('Should load map correctly', () =>{
        // keeping it at the start of the line as exact coords are important for the test
        const input =
`
ABC
EFG
`
        const loader = new StringMultiLineLoader(input)
        const map = loader.loadMap()
        expect(map.getPoint(2, 0)?.getValue()).toBe('E')
        expect(map.getPoint(1, 2)?.getValue()).toBe('C')
        expect(map.getPoint(4,4)?.getValue()).toBeUndefined()
    })
})
// we could add more cases in a real world, but as this is an assignment I saved some time
