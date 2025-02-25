import Solver from "../solver.js"

export default function AocArray(data) {

    Array.call(this, data)

    this.count = function(item) {
        return this.reduce((acc, curr) => (curr === item) ? acc + 1 : acc, 0)
    }
    
    this.sum = function() {
        return this.reduce((acc, curr) => acc + curr, 0)
    }
}

let x = new Array([1,2,3])
console.log('>', x)
console.log('>>', x.entries)
for (let k of Object.getOwnPropertyNames(x))
    console.log('>>>', k)
