import {PointMap} from '../map/PointMap';
import {END_SYMBOL} from '../Config';
import {Point} from '../map/Point';
import {UnexpectedError} from '../errors/UnexpectedError';
import {Step} from './Step';

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
        const currentValue = currentPoint.getValue()
        if (currentValue === null) {
            throw new UnexpectedError(`Collector detected on null point ${currentPoint.row}:${currentPoint.col}`)
        }
        this.path.push(currentValue)
        if (currentPoint.isChar) {
            this.letters.push(currentValue)
        }

        const currentStep = new Step(this.map, currentPoint, previousPoint)
        currentStep.validateLoop()

        const nextPoint = currentStep.findNext()
        if (nextPoint !== null) {
            // a "contract" with step is to return null if it reached end symbol
            // instead of this class checking for the specific symbol.
            // this way we keep collector agnostic about meaning of specific symbols
            this.collectOnPoint(nextPoint, previousPoint)
        }
    }
}
