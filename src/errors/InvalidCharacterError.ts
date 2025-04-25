export class InvalidCharacterError extends Error {
    constructor(character: string) {
        super(`Invalid character received: ${character}`);
    }
}
