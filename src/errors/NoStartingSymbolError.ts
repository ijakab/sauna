export class NoStartingSymbolError extends Error {
    constructor() {
        super(`Provided map has no starting symbols`);
    }
}
