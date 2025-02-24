import aocInit from './initialiser.js'
import {readInput, runWithElapsed, year} from './aocUtil.js' 

const initialMsg = `>>> AoC ${year} (JS version) <<<`
const initCompleteMsg = '=> Initialisation complete'
const argv = process.argv.slice(2) 
const day = argv[0]
const test = argv[1] === '-test'
const solver = aocInit()[year][day]

console.log(initialMsg)
solver.initialise(readInput(day, test))
console.log(initCompleteMsg)
for (let part of [1, 2]) {
    const result = runWithElapsed(solver[`part${part}`], solver)
    console.log(`=> Part${part} solved. Result: ${result.value} in ${result.elapsed} msec`)
}
