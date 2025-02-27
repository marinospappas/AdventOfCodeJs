import {Config} from './config.js'
import {readInput} from './inputreader.js' 

// must be run from ./aoc - all imports are relative to this dir 

const initCompleteMsg = '=> Initialisation complete'
const argv = process.argv.slice(2) 
const day = argv[0]
const test = argv[1] === '-test'

console.log(Config.message)
const solver = Config.getSolver(day)
solver.initialise(readInput(day, Config.year, test))
console.log(initCompleteMsg)
for (let i of [1, 2]) {
    const result = solver[`part${i}`]
    console.log(`=> Part${i} solved. Result: ${result.value} in ${result.elapsed} msec`)
}
