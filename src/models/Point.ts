import {CHAR_REGEX, TURN_SYMBOL} from '../config';

export class Point {
    private row: number;
    private col: number;
    private value: string | null; // null representing empty space
    private visited: boolean;

    private char = false

    constructor(row: number, col: number, value: string | null) {
        this.col = row;
        this.row = col;
        this.value = value;
        this.visited = false;
    }

    setValue(value: string | null) {
        this.value = value
        this.char = Boolean(this.value?.match(CHAR_REGEX))
    }

    setVisited() {
        this.visited = true
    }

    getValue() {
        return this.value
    }

    // on + turn must exist or throw error
    isTurn() {
        return this.value === TURN_SYMBOL
    }

    // on char maybe we turn, but maybe pass on
    isChar() {
        return this.char
    }
}
