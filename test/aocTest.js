
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
        if (inputs === undefined) {
            return this.singleTestResult(this.description, f, this.scope);
        } else {    
            return this.parameterisedTestResults(this.description, f, this.scope, inputs);
        }
    }

    singleTestResult(description, f, scope) {
        return new AocTestResult(description, this.safeExecute(f, scope, []), false);
    }

    parameterisedTestResults(description, f, scope, inputs) {
        const results = [];
        for (let params of inputs) {
            results.push(new AocTestResult(`${description}, input: ${params}`, this.safeExecute(f, scope, params), false))
        }
        return new AocParameterisedTestResult(results);
    }

    safeExecute(f, scope, params) {
        try {
            return f.apply(scope, params);
        } catch (error) {
            return `Exception: ${error}`;
        }
    }
}

class AocTestResult {
    constructor(description, actual, skip) {
        this.description = description;
        this.actual = actual;
        this.skip = skip;
    }

    is(expected) {
        if (this.checkSkip(this.skip))
            return true;
        if (isEqual(this.actual, expected)) {
            passTest(this.description, this.actual);
        } else {
            failTest(this.description, expected, this.actual);
        }
    }

    throws(expected) {
        if (this.checkSkip(this.skip))
            return true;
        if (this.actual.startsWith('Exception:') && this.actual.endsWith(expected)) {
            passTest(this.description, this.actual);
        } else {
            failTest(this.description, `Exception: ${expected}`, this.actual);
        }
    }

    hasLength(expected) {
        if (this.checkSkip(this.skip))
            return true;
        if (!Array.isArray(this.actual) && !this.actual instanceof String) {
            failTest(this.description, expected, `Not an array or string: ${this.actual}`);
        } else if (this.actual.length !== expected) {
            failTest(this.description, expected, this.actual.length);
        } else {
            passTest(this.description, this.actual.length);
        }

    }

    // todo: add matchers - contains, doesNotContain, doesNotThrow

    checkSkip(skip) {
        if (skip) 
            skipTest(this.description);
        return skip;
    }
}

class AocParameterisedTestResult {
    constructor(results) {
        this.results = results;
    }

    is(expected) {
        for (let index in expected) {
            this.results[index].is(expected[index])
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

export function isEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}
