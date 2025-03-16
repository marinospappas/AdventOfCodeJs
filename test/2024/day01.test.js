import {test, parameterisedTest} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js' 
import ListComparator from "../../solvers/2024/day01/ListComparator.js";

// run from test directory

const SKIP = true;
const solver = new ListComparator();
solver.initialise(readInput(1, Config.year, true));
console.log('');

test('verify both lists read', () =>
    solver.inputData.length
).expect(2);

test('verify both lists have correct length', () =>
    solver.inputData[0].length === 6 && solver.inputData[1].length === 6
).expect(true);

test('execute part 1', () => 
    solver.solvePart1()
).expect(11);

test('execute part 2', () => 
    solver.solvePart2()
).expect(31);

console.log('');
