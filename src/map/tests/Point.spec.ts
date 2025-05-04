import {Point} from '../Point';
import {Direction} from '../../Direction';
import {UnexpectedError} from '../../errors/UnexpectedError';
import {TURN_SYMBOL} from '../../Config';

describe('Point', () => {
    it('should initializes with correct values', () => {
        const point = new Point(1, 2, 'A');

        expect(point.row).toBe(1);
        expect(point.col).toBe(2);
        expect(point.getValue()).toBe('A');
        expect(point.visited).toBe(0);
    });

    it('should update the value and flags correctly', () => {
        const point = new Point(1, 2, null);

        point.setValue('A');

        expect(point.getValue()).toBe('A');
        expect(point.isChar).toBe(true);
        expect(point.isTurn).toBe(false);
        expect(point.isDirectionKeeper).toBe(false);

        point.setValue(TURN_SYMBOL);

        expect(point.getValue()).toBe(TURN_SYMBOL);
        expect(point.isChar).toBe(false);
        expect(point.isTurn).toBe(true);
        expect(point.isDirectionKeeper).toBe(false);

        point.setValue('-');

        expect(point.getValue()).toBe('-');
        expect(point.isChar).toBe(false);
        expect(point.isTurn).toBe(false);
        expect(point.isDirectionKeeper).toBe(true);
    });

    it('should returns correct coordinates for each direction', () => {
        const point = new Point(5, 5, null);

        expect(point.adjacentIndex(Direction.UP)).toEqual([4, 5]);
        expect(point.adjacentIndex(Direction.DOWN)).toEqual([6, 5]);
        expect(point.adjacentIndex(Direction.LEFT)).toEqual([5, 4]);
        expect(point.adjacentIndex(Direction.RIGHT)).toEqual([5, 6]);
    });

    it('should return correct direction from adjacent point', () => {
        const center = new Point(5, 5, null);
        const up = new Point(4, 5, null);
        const down = new Point(6, 5, null);
        const left = new Point(5, 4, null);
        const right = new Point(5, 6, null);

        expect(center.directionFrom(up)).toBe(Direction.UP);
        expect(center.directionFrom(down)).toBe(Direction.DOWN);
        expect(center.directionFrom(left)).toBe(Direction.LEFT);
        expect(center.directionFrom(right)).toBe(Direction.RIGHT);
    });

    it('should throw for non-adjacent points', () => {
        const point = new Point(5, 5, null);
        const nonAdjacent = new Point(7, 7, null);

        expect(() => point.directionFrom(nonAdjacent)).toThrow(UnexpectedError);
    });
});
