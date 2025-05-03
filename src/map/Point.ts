import {CHAR_REGEX, TURN_SYMBOL} from '../Config';
import {Direction} from '../Direction';
import {UnexpectedError} from '../errors/UnexpectedError';

export class Point {
    public row: number;
    public col: number;
    private value: string | null; // null representing empty space
    public visited: boolean;

    public isChar = false
    public isTurn = false

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
}
