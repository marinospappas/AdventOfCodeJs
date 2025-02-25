import Config from './config.js'
import readInput from './inputreader.js' 

const initCompleteMsg = '=> Initialisation complete'
const argv = process.argv.slice(2) 
const day = argv[0]
const test = argv[1] === '-test'
const config = new Config()

const solver = config.getSolver(day)
console.log(solver)
for (let k of Object.getOwnPropertyNames(solver))
    console.log(k)

console.log(config.message)
solver.initialise(readInput(day, config.year, test))
console.log(initCompleteMsg)
for (let i of [1, 2]) {
    const result = solver[`part${i}`]
    console.log(`=> Part${i} solved. Result: ${result.value} in ${result.elapsed} msec`)
}
