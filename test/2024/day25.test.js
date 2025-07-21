import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js';

// run from ./test directory

const day = 25;

const SKIP = true;
const solver = Config.getSolver(day);
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const [locks, keys] = solver.inputData;
        console.log("Locks")
        locks.forEach(lock => console.log(lock.toString()));
        console.log("Keys")
        keys.forEach(key => console.log(key.toString()));
        return [locks.length, keys.length];
    })
    .is([2, 3]);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(3);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is('End of AoC 2024 - Merry Christmas');

console.log('');
