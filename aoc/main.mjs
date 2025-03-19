import {Config} from './Config.js';
import {readInput} from './inputReader.js' 

// must be run from ./aoc - all imports are relative to this dir 

const initCompleteMsg = '=> Initialisation complete';
const argv = process.argv.slice(2) ;
const day = argv[0];

console.log('\n', Config.message + `Day ${day} <<<`);
const solver = Config.getSolver(day);
solver.initialise(readInput(day, Config.year));
console.log(initCompleteMsg);
for (let i of [1, 2]) {
    const result = solver[`part${i}`];
    console.log(`=> Part${i} solved. Result: ${result.value} in ${result.elapsed} msec`);
}
console.log('');