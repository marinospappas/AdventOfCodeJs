import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js' 

// run from ./test directory

const day = 5;

const SKIP = true;
const solver = Config.getSolver(day);
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const [rules, pagesList] = solver.inputData;
        console.log(rules.toString());
        console.log(pagesList);
        return [rules.size, pagesList.length];
    })
    .is([7, 6]);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(0);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(0);

console.log('');
