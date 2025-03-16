import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js' 
import ListComparator from "../../solvers/2024/day01/ListComparator.js";

// run from ./test directory

const SKIP = true;
const solver = new ListComparator();
solver.initialise(readInput(1, Config.year, true));
console.log('');

test('verify both lists read', solver)
    .resultOf(() => solver.inputData)
    .hasLength(2);

test('verify both lists have correct length', solver)
    .resultOf(() => solver.inputData[0].length === 6 && solver.inputData[1].length === 6)
    .is(true);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(11);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(31);

console.log('');
