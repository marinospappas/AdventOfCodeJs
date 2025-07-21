import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js';

// run from ./test directory

const day = 13;

const SKIP = true;
const solver = Config.getSolver(day);
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const inputData = solver.inputData;
        console.log(inputData);
        return inputData.length;
    })
    .is(4);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(480);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(875318608908);

console.log('');
