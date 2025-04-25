export class MultipleStartingSymbolError extends Error {
    constructor() {
        super(`Provided map has multiple starting symbols`);
    }
}
