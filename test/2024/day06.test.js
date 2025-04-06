import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js';

// run from ./test directory

const day = 6;

const SKIP = true;
const solver = Config.getSolver(day);
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const [grid, start] = solver.inputData;
        console.log(grid.toString());
        console.log(start)
        const [maxX, maxY] = grid.getDimensions();
        return [maxX, maxY, start.x, start.y];
    })
    .is([10, 10, 4, 6]);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(41);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(0);

console.log('');
