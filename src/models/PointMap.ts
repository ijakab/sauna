import { Point } from './Point';
import {InvalidCharacterError} from '../errors/InvalidCharacterError';
import {UnexpectedError} from '../errors/UnexpectedError';

const VALID_CHARACTERS = /[A-Z]-\|\+/

export class PointMap {
    private grid: Point[][] = [];

    constructor(rowCount: number, colCount: number) {
        for (let i = 0; i < rowCount; i++) {
            const row: Point[] = []
            this.grid.push(row)
            for (let j = 0; j < colCount; j++) {
                row.push(new Point(i, j, null))
            }
        }
    }

    getPoint(row: number, col: number): Point {
        const point = this.grid?.[row]?.[col];
        if (!point) {
            throw new UnexpectedError(`Trying to access non-existing coordinates ${row}:${col}`)
        }
        return point
    }

    setPoint(row: number, col: number, value: string) {
        if (!value.match(VALID_CHARACTERS)) {
            throw new InvalidCharacterError(value)
        }
        const point = this.getPoint(row, col)
        point.setValue(value)
    }
}
