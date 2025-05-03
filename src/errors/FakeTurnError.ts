export class FakeTurnError extends Error {
    constructor() {
        super(`There is a turn symbol with no valid turning points`);
    }
}
