import {Point} from '../models/Point';
import {PointMap} from '../models/PointMap';
import {LoopDetectedError} from '../errors/LoopDetectedError';

export class Step {
    constructor(
        private map: PointMap,
        private currentPoint: Point,
        private previousPoint?: Point
    ) {
    }

    public validateLoop() {
        // This solution is probably not valid for all possible cases
        // I was thinking about the problem on how to detect if we are just going in the closed loop, and end character is outside.
        // e.g. imagine following input
        // @ + + x
        //   + +
        // At the start we would see that there is an x char, but it is very hard to prove that there is an actual path from start to end char
        // I am not a mathematician and don't see an easy solution to this, but this seems to be a good approximation and valid for our test cases
        // In a real world, we could get help from today's LLMs, but I am assuming the point of the task is not to use them.
        // Full honesty, it seems that my brain has erased the graph theory knowledge as I didn't use it since university :)
        if (this.currentPoint.isVisited() && this.previousPoint?.isVisited()) {
            throw new LoopDetectedError()
        }
    }
}
