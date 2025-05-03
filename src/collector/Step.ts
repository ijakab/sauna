import {Point} from '../map/Point';
import {PointMap} from '../map/PointMap';
import {LoopDetectedError} from '../errors/LoopDetectedError';
import {Direction, OpposingDirections, OrthogonalDirections} from '../Direction';
import {MultipleStartingPathsError} from '../errors/MultipleStartingPathsError';
import {MissingSymbolError} from '../errors/MissingSymbolError';
import {NoStartingPathsError} from '../errors/NoStartingPathsError';
import {END_SYMBOL, TURN_SYMBOL} from '../Config';
import {ForkInPathError} from '../errors/ForkInPathError';
import {FakeTurnError} from '../errors/FakeTurnError';
import {BrokenPathError} from '../errors/BrokenPathError';

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
        if (this.currentPoint.visited && this.previousPoint?.visited) throw new LoopDetectedError()
    }

    public findNext(): Point | null {
        const currentSymbol = this.currentPoint.getValue()
        // stop collecting after end symbol
        if (currentSymbol === END_SYMBOL) return null
        if (!this.previousPoint) return this.findNextOnStartingPoint()
        if (currentSymbol === TURN_SYMBOL) return this.findNextOnTurn()
        if (this.currentPoint.isChar) return this.findNextForLetter()
        if (this.currentPoint.isDirectionKeeper) return this.findNextInDirectionOrFail()

        throw new Error(`The system did not find next point for ${this.currentPoint.row}:${this.currentPoint.col} (${this.currentPoint.getValue()})`)
    }

    private findNextOnStartingPoint(): Point {
        // on starting point, we can find exactly one adjacent non-empty point
        const adjacentPoints = this.getPointsInDirection(Object.values(Direction))
        if (adjacentPoints.length > 1) throw new MultipleStartingPathsError()
        if (adjacentPoints.length === 0) throw new NoStartingPathsError()

        return adjacentPoints[0] as Point
    }

    private findNextOnTurn(): Point {
        const direction = this.currentPoint.directionFrom(this.previousPoint as Point)
        const opposingPoints = this.getPointsInDirection(OrthogonalDirections[direction])

        if (opposingPoints.length > 1) throw new ForkInPathError()
        if (opposingPoints.length === 0) throw new FakeTurnError()

        return opposingPoints[0] as Point
    }

    private findNextInDirection() {
        const direction = this.currentPoint.directionFrom(this.previousPoint as Point)
        return this.getPointsInDirection([OpposingDirections[direction]])[0]
    }

    private findNextInDirectionOrFail() {
        const nextInDirection = this.findNextInDirection()
        if (!nextInDirection) throw new BrokenPathError()
        return nextInDirection
    }

    private findNextForLetter() {
        const pointInDirection = this.findNextInDirection()
        if (pointInDirection) return pointInDirection
        return this.findNextOnTurn()
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
