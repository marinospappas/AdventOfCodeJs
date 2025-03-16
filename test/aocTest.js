
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
            return `Exception: ${error.message}`;
        }
    }
}

class AocTestResult {
    constructor(description, actual, skip) {
        this.description = description;
        this.actual = actual;
        this.skip = skip;
    }

    shouldBe(expected) {
        if (this.skip) {
            skipTest(this.description);
            return true;
        }
        if (isEqual(this.actual, expected)) {
            passTest(this.description, this.actual);
        } else {
            failTest(this.description, expected, this.actual);
        }
    }
}

class AocParameterisedTestResult {
    constructor(results) {
        this.results = results;
    }

    shouldBe(expected) {
        for (let index in expected) {
            this.results[index].shouldBe(expected[index])
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
