import {Step} from '../Step';
import {PointMap} from '../../map/PointMap';
import {Point} from '../../map/Point';
import {END_SYMBOL, START_SYMBOL, TURN_SYMBOL} from '../../Config';
import {LoopDetectedError} from '../../errors/LoopDetectedError';
import {ForkInPathError} from '../../errors/ForkInPathError';
import {FakeTurnError} from '../../errors/FakeTurnError';
import {BrokenPathError} from '../../errors/BrokenPathError';
import {MultipleStartingPathsError} from '../../errors/MultipleStartingPathsError';

describe('Step', () => {
    let map: PointMap;
    let startForkedPoint: Point;
    let startCorrectPoint: Point
    let endPoint: Point;
    let turn1Point: Point;
    let turn2Point: Point;
    let keepDirectionPoint: Point;
    let letterPoint: Point

    beforeEach(() => {
        // map is not fully valid, but it does not matter as these are unit tests
        // it helps us test a lot of error cases
        /*
        @xB
        +-A
        +
        @
         */
        map = new PointMap(4, 4);
        map.setPoint(0, 2, 'A')
        map.setPoint(0, 0, START_SYMBOL);
        map.setPoint(0, 1, END_SYMBOL);
        map.setPoint(1, 0, TURN_SYMBOL)
        map.setPoint(1, 1, '-')
        map.setPoint(2, 0, TURN_SYMBOL)
        map.setPoint(1, 2, 'A')
        map.setPoint(3, 0, START_SYMBOL)
        startForkedPoint = map.getPointOrFail(0, 0)
        startCorrectPoint = map.getPointOrFail(3, 0)
        endPoint = map.getPointOrFail(0, 1)
        turn1Point = map.getPointOrFail(1, 0)
        turn2Point = map.getPoint(2, 0)
        keepDirectionPoint = map.getPointOrFail(1, 1)
        letterPoint = map.getPointOrFail(1, 2)
    });

    describe('validate loop logic', () => {
        it('should do nothing if there is no previous point', () => {
            const stepWithoutPrevious = new Step(map, startForkedPoint);
            expect(() => stepWithoutPrevious.validateLoop()).not.toThrow();
        });

        it('should throw LoopDetectedError if current point was visited and previous point was visited more than once', () => {
            const stepWithPrevious = new Step(map, startForkedPoint, endPoint);
            startForkedPoint.visited = 1;
            endPoint.visited = 2;
            expect(() => stepWithPrevious.validateLoop()).toThrow(LoopDetectedError);
        });

        it('should not throw if conditions for loop detection are not met', () => {
            const step = new Step(map, startForkedPoint, endPoint)
            startForkedPoint.visited = 1;
            endPoint.visited = 1;

            expect(() => step.validateLoop()).not.toThrow();
        });
    });

    describe('start end points', () => {
        it('should return null if current symbol is END_SYMBOL', () => {
            const step = new Step(map, endPoint, startForkedPoint)
            expect(step.findNext()).toBeNull();
        });

        it('should find only other point if current is starting point', () => {
            const stepWithoutPrevious = new Step(map, startCorrectPoint);

            expect(stepWithoutPrevious.findNext()).toBe(turn2Point);
        });

        it('should throw if multiple starting paths', () => {
            const stepWithoutPrevious = new Step(map, startForkedPoint);

            expect(() => stepWithoutPrevious.findNext()).toThrow(MultipleStartingPathsError)
        });
    });

    describe('turn logic', () => {
        it('should find the next point in an orthogonal direction', () => {
            const step = new Step(map, turn1Point, startForkedPoint)

            expect(step.findNext()).toBe(keepDirectionPoint);
        });

        it('should throw ForkInPathError if more than one orthogonal point', () => {
            const step = new Step(map, turn1Point, keepDirectionPoint)
            expect(() => step.findNext()).toThrow(ForkInPathError);
        });

        it('should throw FakeTurnError if no orthogonal points', () => {
            const step = new Step(map, turn2Point, turn1Point)

            expect(() => step.findNext()).toThrow(FakeTurnError);
        });
    });

    describe('keeping direction', () => {
        it('Should find next in direction', () => {
            const step = new Step(map, keepDirectionPoint, turn1Point)
            expect(step.findNext()).toBe(letterPoint)
        })
        it('Should throw BrokenPathError if there is nothing in path', () => {
            const step = new Step(map, keepDirectionPoint, endPoint)
            expect(() => step.findNext()).toThrow(BrokenPathError)
        })
    })

    // realistically, we could add many more cases, but it takes a lot of time for the assignment
});
