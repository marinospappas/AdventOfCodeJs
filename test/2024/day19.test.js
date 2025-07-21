import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js';

// run from ./test directory

const day = 19;

const SKIP = true;
const solver = Config.getSolver(day);
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const [patterns, designs] = solver.inputData;
        console.log("patterns", patterns)
        console.log("designs", designs);
        return [patterns.length, designs.length];
    })
    .is([8, 8]);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(6);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(16);

console.log('');
