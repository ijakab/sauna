import { PointMap } from '../map/PointMap';
import {ILoader} from './ILoader';
import {StringArrayLoader} from './StringArrayLoader';

// this represents a way to load Map class from Input as multiline strings.
// we could add more loaders, which represent a way to create map from different inputs (e.g. array of array of chars)
export class StringMultiLineLoader implements ILoader {
    constructor(private input: string) {
    }

    loadMap(): PointMap {
        const rows = this.input.split('\n')
        return new StringArrayLoader(rows).loadMap()
    }
}
