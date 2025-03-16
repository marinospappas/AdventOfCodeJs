import {test, parameterisedTest} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js' 
import ReportAnalyser from "../../solvers/2024/day02/ReportAnalyser.js";

// run from test directory

const SKIP = true;
const solver = new ReportAnalyser();
solver.initialise(readInput(2, Config.year, true));
console.log('');

test('verify number of lists read', () =>
    solver.inputData.length
).expect(6);

test('verify length of input data lists', () =>
    solver.inputData.filter(l => l.length === 5).length
).expect(6);

const inputs1 = [
    [[7, 6, 4, 2, 1]],
    [[1, 2, 7, 8, 9]],
    [[9, 7, 6, 2, 1]],
    [[1, 3, 2, 4, 5]],
    [[8, 6, 4, 4, 1]],
    [[1, 3, 6, 7, 9]]
];
const expected1 = [true, false, false, false, false, true];
parameterisedTest('checks list is safe', 
    solver, solver.isSafe, inputs1
).expect(expected1);

test('execute part 1', () => 
    solver.solvePart1()
).expect(2);

test('execute part 2', () => 
    solver.solvePart2()
).expect(4);

console.log('');
