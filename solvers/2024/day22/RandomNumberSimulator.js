import {Solver} from "../../../aoc/Solver.js";

// private variables go here
const _numbers = new WeakMap();

export default class RandomNumberSimulator extends Solver {

    initialise(data) {
        _numbers.set(this, data.map(s => parseInt(s)));
    }

    getInputData() {
        return _numbers.get(this);
    }

    // To mix a value into the secret number, calculate the bitwise XOR of the given value and the secret number.
    // Then, the secret number becomes the result of that operation.
    mix(i, j) {
        return i ^ j;
    } 

    // To prune the secret number, calculate the value of the secret number modulo 16777216.
    // Then, the secret number becomes the result of that operation.
    prune(i) {
        return i & 0xffffff;  // modulo 16777216 (0x1000000)
    }

    // Calculate the result of multiplying the secret number by 64.
    // Then, mix this result into the secret number. Finally, prune the secret number.
    // Calculate the result of dividing the secret number by 32.
    // Round the result down to the nearest integer.
    // Then, mix this result into the secret number. Finally, prune the secret number.
    // Calculate the result of multiplying the secret number by 2048.
    // Then, mix this result into the secret number. Finally, prune the secret number.
    generateNextNumber(seed) {
        let res = seed << 6 ;   // multiply by 64
        let secret = this.prune(this.mix(seed, res))
        res = secret >>> 5;   // divide by 32
        secret = this.prune(this.mix(secret, res));
        res = secret << 11;  // multiply by 2048
        return this.prune(this.mix(secret, res));
    }

    generateNthNumber(seed, n) {
        let currentSecret = seed;
        let i = 0;
        while (++i <= n) {
            currentSecret = this.generateNextNumber(currentSecret)
        }
        return currentSecret;
    }

    solvePart1() {
        const numbers = this.getInputData();
        let secretNumbers = [];
        secretNumbers = numbers.map(n => this.generateNthNumber(n, 2000));
        return secretNumbers.reduce((acc, curr) => acc + curr, 0);
    }

    solvePart2() {
        const [patterns, designs] = this.getInputData();  
        return designs.map(p => this.getCountOfPatternCombinations(p, patterns)).reduce((acc, curr) => acc + curr, 0);
    }
}
