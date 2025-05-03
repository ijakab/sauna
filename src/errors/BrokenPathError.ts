export class BrokenPathError extends Error {
    constructor() {
        super(`There is a broken path detected while traversing map`);
    }
}
