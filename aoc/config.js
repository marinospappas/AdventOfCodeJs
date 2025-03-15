import * as modules from "../solvers/indexSolvers.js"

export class Config {
    static year = 2024
    static message = `\n>>> AoC ${Config.year} (JS version) <<<`
    
    static getSolver = function(day) {
        return Config.solvers[Config.year][day]
    }

    static initSolvers() {
        return {
            2024: {
                1: new modules.Solver2024D01(),
                2: new modules.Solver2024D02()
            }
        }
    }

    static solvers = Config.initSolvers()
}
