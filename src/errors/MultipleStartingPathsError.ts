export class MultipleStartingPathsError extends Error {
    constructor() {
        super(`Provided map has multiple starting paths`);
    }
}
