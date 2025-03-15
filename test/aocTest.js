const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

class AocTestResult {
    constructor(decription, actual) {
        this.decription = decription;
        this.actual = actual;
    }

    expect(expected) {
        if (this.isEqual(this.actual, expected)) {
            console.log(`${GREEN}PASSED${RESET} - ${this.decription}`);
        } else {
            console.error(`${RED}*FAILED - ${this.decription}${RESET}`);
            console.error(`           expected ${expected}`);
            console.error(`           actual   ${this.actual}`);
        }
    }

    isEqual(a, b) {
        //todo: needs more thinking
        return a === b;
    }
}

export function test(description, f) {
    return new AocTestResult(description, f());
}
