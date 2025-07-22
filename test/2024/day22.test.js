import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js';

// run from ./test directory

const day = 22;

const SKIP = true;
const solver = Config.getSolver(day);
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const numbers = solver.inputData;
        console.log(numbers)
        return numbers.length;
    })
    .is(4);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(37327623);

test('execute part 2', solver, SKIP)
    .resultOf(solver.solvePart2)
    .is('co,de,ka,ta');

console.log('');
