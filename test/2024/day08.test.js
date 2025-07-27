import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js';

// run from ./test directory

const day = 8;

const SKIP = true;
const solver = Config.getSolver(day);
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const grid = solver.inputData;
        console.log(grid.toString());
        return grid.getDimensions();
    })
    .is([12, 12]);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(14);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(34);

console.log('');
