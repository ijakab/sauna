import {CHAR_REGEX, DIRECTION_KEEPER_REGEX, TURN_SYMBOL} from '../Config';
import {Direction} from '../Direction';
import {UnexpectedError} from '../errors/UnexpectedError';

export class Point {
    public row: number;
    public col: number;
    private value: string | null; // null representing empty space
    public visited: boolean;

    public isChar = false
    public isTurn = false
    public isDirectionKeeper = false

    constructor(row: number, col: number, value: string | null) {
        this.row = row;
        this.col = col;
        this.value = value;
        this.visited = false;
    }

    setValue(value: string | null) {
        this.value = value
        this.isChar = Boolean(value?.match(CHAR_REGEX))
        this.isTurn = value === TURN_SYMBOL
        this.isDirectionKeeper = Boolean(value?.match(DIRECTION_KEEPER_REGEX))
    }

    getValue() {
        return this.value
    }

    adjacentIndex(direction: Direction): [number, number] {
        if (direction === Direction.DOWN) {
            return [this.row + 1, this.col]
        }
        if (direction === Direction.UP) {
            return [this.row - 1, this.col]
        }
        if (direction === Direction.LEFT) {
            return [this.row, this.col - 1]
        }
        if (direction === Direction.RIGHT) {
            return [this.row, this.col + 1]
        }
        throw new UnexpectedError(`Unknown direction ${direction}`)
    }

    directionFrom(adjacentPoint: Point) {
        if (this.row === adjacentPoint.row) {
            if (this.col === adjacentPoint.col + 1) {
                return Direction.LEFT
            }
            if (this.col === adjacentPoint.col - 1) {
                return Direction.RIGHT
            }
        }
        if (this.col === adjacentPoint.col) {
            if (this.row === adjacentPoint.row + 1) {
                return Direction.UP
            }
            if (this.row === adjacentPoint.row - 1) {
                return Direction.DOWN
            }
        }
        throw new UnexpectedError(`Points ${this.row}:${this.col} and ${adjacentPoint.row}:${adjacentPoint.col} are not adjacent`)
    }
}
