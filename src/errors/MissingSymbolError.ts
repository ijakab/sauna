export class MissingSymbolError extends Error {
    constructor(symbol: string) {
        super(`Provided map has no symbol ${symbol}`);
    }
}
