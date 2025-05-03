export class NoStartingPathsError extends Error {
    constructor() {
        super(`Provided map has no starting paths`);
    }
}
