import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js' 
import ReportAnalyser from "../../solvers/2024/day02/ReportAnalyser.js";

const solver = new ReportAnalyser();
solver.initialise(readInput(2, Config.year, true));
console.log('');

test('checks list is safe', () => 
    solver.isSafe([7, 6, 4, 2, 1]))
    .expect(true);

test('checks list is safe - test failure', () => 
    solver.isSafe([7, 6, 4, 2, 1]))
    .expect(false);

console.log('');
