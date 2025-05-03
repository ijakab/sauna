export enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export const OpposingDirections: Record<Direction, Direction> = {
    [Direction.UP]: Direction.DOWN,
    [Direction.DOWN]: Direction.UP,
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT,
}

export const OrthogonalDirections: Record<Direction, [Direction, Direction]> = {
    [Direction.UP]: [Direction.LEFT, Direction.RIGHT],
    [Direction.DOWN]: [Direction.LEFT, Direction.RIGHT],
    [Direction.LEFT]: [Direction.UP, Direction.DOWN],
    [Direction.RIGHT]: [Direction.UP, Direction.DOWN],
}
