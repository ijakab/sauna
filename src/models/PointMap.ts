import { Point } from './Point';
import {InvalidCharacterError} from '../errors/InvalidCharacterError';
import {UnexpectedError} from '../errors/UnexpectedError';
import {START_SYMBOL, VALID_SYMBOL_REGEX} from '../config';
import {NoStartingSymbolError} from '../errors/NoStartingSymbolError';
import {MultipleStartingSymbolError} from '../errors/MultipleStartingSymbolError';

export class PointMap {
    private grid: Point[][] = [];
    private flatGrid: Point[] = []

    constructor(rowCount: number, colCount: number) {
        for (let i = 0; i < rowCount; i++) {
            const row: Point[] = []
            this.grid.push(row)
            for (let j = 0; j < colCount; j++) {
                const point = new Point(i, j, null)
                row.push(point)
                this.flatGrid.push(point)
            }
        }
    }

    getPointOrFail(row: number, col: number): Point {
        const point = this.getPoint(row, col)
        if (!point) {
            throw new UnexpectedError(`Trying to access non-existing coordinates ${row}:${col}`)
        }
        return point
    }

    // useful if we want to treat empty points same as out of bounds or non existing
    getNonEmpty(row: number, col: number): Point {
        return this.grid?.[row]?.[col];
    }

    getPoint(row: number, col: number): Point {
        return this.grid?.[row]?.[col];
    }

    setPoint(row: number, col: number, value: string) {
        if (value.length !== 1 || !value.match(VALID_SYMBOL_REGEX)) {
            throw new InvalidCharacterError(value)
        }
        const point = this.getPointOrFail(row, col)
        point.setValue(value)
    }

    getStartingPoint(): Point {
        const startingPoints = this.flatGrid.filter(point => point.getValue() === START_SYMBOL)
        if (startingPoints.length === 0) throw new NoStartingSymbolError()
        if (startingPoints.length > 1) throw new MultipleStartingSymbolError()
        return startingPoints[0]
    }
}
