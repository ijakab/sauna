import { PointMap } from '../models/PointMap';
import {ILoader} from './ILoader';

// this represents a way to load Map class from Input as array of strings.
// we could add more loaders, which represent a way to create map from different inputs (e.g. array of array of chars)
export class StringArrayLoader implements ILoader {
    constructor(private input: string[]) {
    }

    loadMap(): PointMap {
        const rowsCount = this.input.length
        const maxLengthRow = this.input.reduce((max, str) => Math.max(max, str.length), 0);
        const map = new PointMap(rowsCount, maxLengthRow)

        for (let i = 0; i < this.input.length; i++) {
            const row = this.input[i]
            for (let j = 0; j < row.length; j++) {
                map.setPoint(i, j, row[j])
            }
        }
        return map
    }
}
