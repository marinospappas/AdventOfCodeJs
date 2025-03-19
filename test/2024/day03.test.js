import {test} from "../aocTest.js";
import {Config} from "../../aoc/Config.js";
import {readInput} from '../../aoc/inputReader.js' 
import CorruptedMemCleaner from "../../solvers/2024/day03/CorruptedMemCleaner.js";

// run from ./test directory

const SKIP = true;
const day = 3;
const solver = new CorruptedMemCleaner();
solver.initialise(readInput(day, Config.year, true));
console.log('\n', Config.message + `Day ${day} Test <<<`);

test('verify input data is read', solver)
    .resultOf(() => {
        const result = solver.inputData;
        console.log('input data:', result);
        return result;
    })
    .hasLength(83);

const inputs1 = [
    ['mul(11,8)'],
    ['mul(123,456)'],
    ['mul[3,7]'],
    ['mul(11,8 )'],
    ['mul(1234,8)'],
];
const expected1 = [[11,8], [123,456], null, null, null];
test('mathces mul expression', solver)
    .resultOf(solver.matchMul, inputs1)
    .is(expected1);

const inputs2 = [
    ['do()'],
    ['do( )'],
    ['do ()']
];
const expected2 = [['do()'], null, null];
test('mathces do', solver)
    .resultOf(solver.matchDo, inputs2)
    .is(expected2);

const inputs3 = [
    ["don't()"],
    ['dont()'],
    ['don_t()']
];
const expected3 = [["don't()"], null, null];
test("mathces don't", solver)
    .resultOf(solver.matchDont, inputs3)
    .is(expected3);

test('execute part 1', solver)
    .resultOf(solver.solvePart1)
    .is(161);

test("filter don't - do", solver)
    .resultOf(solver.filterDo, [[solver.getInputData()]])
    .is(["xdo()xyzmul(2,4)%&mul[3,7]!@^do()mul(8,5))"]);

test('execute part 2', solver)
    .resultOf(solver.solvePart2)
    .is(48);

console.log('');
