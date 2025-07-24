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

test('calculate differences', solver)
    .resultOf(() => {
        console.log(solver.generateDifferences(123, 9));
        return true;
    })
    .is(true);

test('calculate differences to numbers mapping', solver)
    .resultOf(() => {
        console.log(solver.generateDiffsToNumberMapping(solver.generateDifferences(123, 9)));
        return true;
    })
    .is(true);

solver.initialise(['1', '2', '3', '2024']);
test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(["-2,1,-1,3",23]);

console.log('');
