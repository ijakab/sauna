import {PointMap} from '../models/PointMap';
import {END_SYMBOL} from '../config';
import {Point} from '../models/Point';

export class Collector {
    private letters: string[] = []
    private path: string[] = []

    constructor(private map: PointMap) {
    }

    collect() {
        this.map.getPointWithSymbol(END_SYMBOL) // validate that end symbol exists... but we don't need it right away
        const startingPoint = this.map.getStartingPoint()
        this.collectOnPoint(startingPoint)
    }

    collectOnPoint(currentPoint: Point, previousPoint?: Point) {

    }
}
