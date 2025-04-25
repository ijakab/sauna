export class Point {
    row: number;
    col: number;
    value: string | null; // null representing empty space
    visited: boolean;

    constructor(row: number, col: number, value: string | null) {
        this.col = row;
        this.row = col;
        this.value = value;
        this.visited = false;
    }

    setValue(value: string | null) {
        this.value = value
    }

    setVisited() {
        this.visited = true
    }
}
