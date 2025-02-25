import * as solverInstances from "../solvers/indexSolvers.js"

export default function Config() {
    const aocYear = 2024
    const initialMsg = `>>> AoC ${aocYear} (JS version) <<<`
    const solvers = initSolvers()
    this.getSolver = function(day) {
        return solvers[aocYear][day]
    }
    Object.defineProperty(this, 'year', { get: function() { return aocYear } })
    Object.defineProperty(this, 'message', { get: function() { return initialMsg } })

    function initSolvers() {
        return {
            2024: {
                1: new solverInstances.SolverDay01()
            }
        }
    }
}
