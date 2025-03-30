import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js' 

// run from ./test directory

const day = 4;

const SKIP = true;
const solver = Config.getSolver(day);
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const result = solver.inputData;
        console.log('input data:', result.toString());
        return [result.maxX, result.maxY];
    })
    .is([9, 9]);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(18);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(48);

console.log('');
