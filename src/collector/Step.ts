import {Point} from '../map/Point';
import {PointMap} from '../map/PointMap';
import {LoopDetectedError} from '../errors/LoopDetectedError';
import {Direction} from '../Direction';
import {MultipleStartingPathsError} from '../errors/MultipleStartingPathsError';
import {MissingSymbolError} from '../errors/MissingSymbolError';
import {NoStartingPathsError} from '../errors/NoStartingPathsError';
import {END_SYMBOL, TURN_SYMBOL} from '../Config';
import {ForkInPathError} from '../errors/ForkInPathError';
import {FakeTurnError} from '../errors/FakeTurnError';

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
        const currentSymbol = this.currentPoint.getValue()
        if (currentSymbol === END_SYMBOL) { // stop collecting after end symbol
            return null
        }
        if (!this.previousPoint) {
            return this.findNextOnStartingPoint()
        }
        if (currentSymbol === TURN_SYMBOL) {
            return this.findNextOnTurn()
        }

        throw new Error(`The system did not find next point for ${this.currentPoint.row}:${this.currentPoint.col} (${this.currentPoint.getValue()})`)
    }

    private findNextOnStartingPoint(): Point {
        // on starting point, we can find exactly one adjacent non-empty point
        const adjacentPoints = this.getPointsInDirection(Object.values(Direction))
        if (adjacentPoints.length > 1) {
            throw new MultipleStartingPathsError()
        }
        if (adjacentPoints.length === 0) {
            throw new NoStartingPathsError()
        }
        return adjacentPoints[0] as Point
    }

    private findNextOnTurn(): Point {
        const direction = this.currentPoint.directionFrom(this.previousPoint as Point)
        const opposingDirections = direction === Direction.LEFT || Direction.RIGHT ?
            [Direction.DOWN, Direction.UP] : [Direction.LEFT, Direction.RIGHT]
        const opposingPoints = this.getPointsInDirection(opposingDirections)

        if (opposingPoints.length > 1) {
            throw new ForkInPathError()
        }
        if (opposingPoints.length === 0) {
            throw new FakeTurnError()
        }

        return opposingPoints[0] as Point
    }

    private getPointsInDirection(directions: Direction[]) {
        const adjacentIndexes = directions.map(
            direction => this.currentPoint.adjacentIndex(direction)
        )
        const adjacentPoints = adjacentIndexes
            .map(indexes => this.map.getNonEmptyPoint(...indexes))

        return adjacentPoints.filter(Boolean)
    }
}
