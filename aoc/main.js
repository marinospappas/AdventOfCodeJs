import aocInit from './initialiser.js'
import readInput from './inputreader.js' 

const year = 2024
const initialMsg = `>>> AoC ${year} (JS version) <<<`
const initCompleteMsg = '=> Initialisation complete'
const argv = process.argv.slice(2) 
const day = argv[0]
const test = argv[1] === '-test'
const solver = aocInit()[year][day]

for (let key in solver) console.log(key, solver[key])
console.log(initialMsg)
solver.initialise(readInput(day, year, test))
console.log(initCompleteMsg)
for (let part of [1, 2]) {
    const result = solver[`part${part}`]
    console.log(`=> Part${part} solved. Result: ${result.value} in ${result.elapsed} msec`)
}
