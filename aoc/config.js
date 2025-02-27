import * as solverInstances from "../solvers/indexSolvers.js"

export class Config {
    static year = 2024
    static message = `>>> AoC ${Config.year} (JS version) <<<`
    
    static getSolver = function(day) {
        return Config.solvers[Config.year][day]
    }

    static initSolvers() {
        return {
            2024: {
                1: new solverInstances.SolverDay01(),
                2: new solverInstances.SolverDay02()
            }
        }
    }

    static solvers = Config.initSolvers()
}
