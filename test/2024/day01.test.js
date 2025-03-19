import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js' 
import ListComparator from "../../solvers/2024/day01/ListComparator.js";

// run from ./test directory

const SKIP = true;
const day = 1;
const solver = new ListComparator();
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify both lists read', solver)
    .resultOf(() => solver.inputData)
    .hasLength(2);

test('verify both lists have correct data', solver)
    .resultOf(() => solver.inputData)
    .is([[1,2,3,3,3,4], [3,3,3,4,5,9]]);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(11);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(31);

console.log('');
