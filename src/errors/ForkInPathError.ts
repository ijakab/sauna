export class ForkInPathError extends Error {
    constructor() {
        super(`There is a fork in path detected`);
    }
}
