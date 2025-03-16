
export function test(description, scope, skip = false) {
    return new AocTest(description, scope, skip);
}

class AocTest {
    constructor(description, scope, skip) {
        this.description = description;
        this.scope = scope;
        this.skip = skip;
    }

    resultOf(f, inputs) {
        if (this.skip)
            return new AocTestResult(this.description, null, true);
        if (inputs === undefined) {     // single test
            return new AocTestResult(this.description, f.apply(this.scope), false);
        } else {                        // parameterised test
            const results = [];
            for (let params of inputs) {
                results.push(new AocTestResult(this.description, f.apply(this.scope, params), false))
            }
            return new AocParameterisedTestResult(this.description, inputs, results, false);
        }
    }
}

class AocTestResult {
    constructor(description, actual, skip) {
        this.description = description;
        this.actual = actual;
        this.skip = skip;
    }

    shouldBe(expected, input = "") {
        if (this.skip) {
            skipTest(this.description);
            return true;
        }
        const message = `${this.description}${input ? ', input: ' + input : ''}`;
        if (isEqual(this.actual, expected)) {
            passTest(message, this.actual);
        } else {
            failTest(message, expected, this.actual);
        }
    }
}

class AocParameterisedTestResult {
    constructor(description, inputs, results, skip) {
        this.description = description;
        this.inputs = inputs;
        this.results = results;
        this.skip = skip;
    }

    shouldBe(expected) {
        if (this.skip) {
            skipTest(this.description);
            return true;
        }
        for (let index = 0; index < expected.length; ++index) {
            this.results[index].shouldBe(expected[index], this.inputs[index])
        }
    }
}

function passTest(message, result) {
    console.log(`${green('PASS')} - ${message}, result: ${result}`);
}

function failTest(message, expected, actual) {
    console.log(red(`FAIL - ${message}`));
    console.log(`    expected: ${JSON.stringify(expected)}`);
    console.log(`    actual:   ${red(JSON.stringify(actual))}`);
}

function skipTest(message) {
    console.log(`${blue('SKIP')} - ${message}`)
}

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";

function red(s) {
    return `${RED}${s}${RESET}`;
}

function green(s) {
    return `${GREEN}${s}${RESET}`;
}

function blue(s) {
    return `${BLUE}${s}${RESET}`;
}

function isEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}
