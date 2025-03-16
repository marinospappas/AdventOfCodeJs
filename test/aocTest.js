
export function test(description, f, skip = false) {
    return new AocTestResult(description, f(), skip);
}

export function parameterisedTest(description, context, f, inputs, skip = false) {
    if (skip)
        return new AocTestResult(description, null, skip);
    const actual = [];
    for (let input of inputs) {
        actual.push(f.apply(context, input))
    }
    return new AocParameterisedTestResult(description, inputs, actual, skip);
}

class AocTestResult {
    constructor(description, actual, skip) {
        this.description = description;
        this.actual = actual;
        this.skip = skip;
    }

    expect(expected) {
        if (this.skip) {
            skip(this.description);
            return true;
        }
        if (isEqual(this.actual, expected)) {
            pass(this.description, this.actual);
        } else {
            fail(this.description, expected, this.actual);
        }
    }
}

class AocParameterisedTestResult {
    constructor(description, inputs, actual, skip) {
        this.description = description;
        this.inputs = inputs;
        this.actual = actual;
        this.skip = skip;
    }

    expect(expected) {
        if (this.skip) {
            skip(this.description);
            return true;
        }
        for (let index = 0; index < expected.length; ++index) {
            if (isEqual(this.actual[index], expected[index])) {
                pass(`${this.description}, input: ${this.inputs[index]}`, this.actual[index]);
            } else {
                fail(`${this.description}, input: ${this.inputs[index]}`, expected[index], this.actual[index]);
            }
        }
    }
}

function pass(message, result) {
    console.log(`${green('PASS')} - ${message}, result: ${result}`);
}

function fail(message, expected, actual) {
    console.log(red(`FAIL - ${message}`));
    console.log(`    expected: ${JSON.stringify(expected)}`);
    console.log(`    actual:   ${red(JSON.stringify(actual))}`);
}

function skip(message) {
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
