import {Point} from '../map/Point';
import {PointMap} from '../map/PointMap';
import {LoopDetectedError} from '../errors/LoopDetectedError';
import {Direction} from '../Direction';
import {MultipleStartingPathsError} from '../errors/MultipleStartingPathsError';
import {MissingSymbolError} from '../errors/MissingSymbolError';
import {NoStartingPathsError} from '../errors/NoStartingPathsError';
import {END_SYMBOL} from '../Config';

export class Step {
    constructor(
        private map: PointMap,
        private currentPoint: Point,
        private previousPoint?: Point
    ) {
    }

    public validateLoop() {
        // I was thinking about the problem on how to detect if we are just going in the closed loop, and end character is outside.
        // e.g. imagine following input
        // @ + + x
        //   + +
        // At the start we would see that there is an x char, but it is very hard to prove that there is an actual path from start to end char
        // this may not be a good solution in more complex problems, but since forks are not allowed this is a valid solution for our conditions
        if (this.currentPoint.visited && this.previousPoint?.visited) {
            throw new LoopDetectedError()
        }
    }

    public findNext(): Point | null {
        if (this.currentPoint.getValue() === END_SYMBOL) { // stop collecting after end symbol
            return null
        }
        if (!this.previousPoint) {
            return this.findNextOnStartingPoint()
        }

        // todo throw unexpected error instead
        return null
    }

    private findNextOnStartingPoint(): Point {
        // on starting point, we can find exactly one adjacent non-empty point
        const adjacentPoints = Object.values(Direction)
            .map(direction => this.map.getNonEmptyPoint(...this.currentPoint.adjacentIndex(direction)))
            .filter(Boolean)
        if (adjacentPoints.length > 1) {
            throw new MultipleStartingPathsError()
        }
        if (adjacentPoints.length === 0) {
            throw new NoStartingPathsError()
        }
        return adjacentPoints[0] as Point
    }
}
