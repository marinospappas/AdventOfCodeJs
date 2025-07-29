import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js';
import { File } from "../../solvers/2024/day09/DiskFragmenter.js";

// run from ./test directory

const day = 9;

const SKIP = true;
const solver = Config.getSolver(day);
solver.test = true;
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const fileSystem = solver.inputData;
        console.log(fileSystem);
        return fileSystem.map(f => 
            Array.from({ length: f.size }, () => (f instanceof File) ? f.id.toString() : '.')
        ).flat().join('');
    })
    .is('00...111...2...333.44.5555.6666.777.888899');

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(1928);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(2858);

console.log('');
