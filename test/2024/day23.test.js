import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js';

// run from ./test directory

const day = 23;

const SKIP = true;
const solver = Config.getSolver(day);
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const [connections, allIds] = solver.inputData;
        console.log("connections", connections)
        console.log("all Ids", allIds)
        return [connections.size, [...connections].every(item => item.length === 4), allIds.size, [...allIds].every(s => s.length === 2)];
    })
    .is([32, true, 16, true]);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(7);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is('co,de,ka,ta');

console.log('');
