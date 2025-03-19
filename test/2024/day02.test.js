import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js' 
import ReportAnalyser from "../../solvers/2024/day02/ReportAnalyser.js";

// run from ./test directory

const SKIP = true;
const day = 2;
const solver = new ReportAnalyser();
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify number of lists read', solver)
    .resultOf(() => solver.inputData)   
    .hasLength(6);

test('verify length of input data lists', solver) 
    .resultOf(() => solver.inputData.filter(l => l.length === 5))
    .hasLength(6);

const inputs1 = [
    [[7, 6, 4, 2, 1]],
    [[1, 2, 7, 8, 9]],
    [[9, 7, 6, 2, 1]],
    [[1, 3, 2, 4, 5]],
    [[8, 6, 4, 4, 1]],
    [[1, 3, 6, 7, 9]]
];
const expected1 = [true, false, false, false, false, true];
test('checks list is safe', solver)
    .resultOf(solver.isSafe, inputs1)
    .is(expected1);

test('execute part 1', solver) 
    .resultOf(solver.solvePart1)
    .is(2);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)    
    .is(4);

console.log('');
