import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js';

// run from ./test directory

const day = 10;

const SKIP = true;
const solver = Config.getSolver(day);
solver.test = true;
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

const input1 = [
    "...0...",
    "...1...",
    "...2...",
    "6543456",
    "7.....7",
    "8.....8",
    "9.....9"
    ];

test('verify input data is read', solver)
    .resultOf(() => {
        solver.initialise(input1);
        const [grid, graph] = solver.inputData;
        console.log(grid.toString());
        console.log(graph.toString());
        return [grid.getDimensions(), graph.size].flat();
    })
    .is([7, 7, 16]);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(1928);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(2858);

console.log('');
