export class LoopDetectedError extends Error {
    constructor() {
        super("Loop detected while iterating over map");
    }
}
