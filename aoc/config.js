import * as modules from "../solvers/indexSolvers.js"

export class Config {
    static year = 2024;
    static message = `>>> AoC ${Config.year} (JS version) `;
    
    static getSolver = function(day) {
        return Config.solvers[Config.year][day];
    }

    static getSolvers() {
        return {
            2024: {
                1:  new modules.Solver2024D01(),
                2:  new modules.Solver2024D02(),
                3:  new modules.Solver2024D03(),
                4:  new modules.Solver2024D04(),
                5:  new modules.Solver2024D05(),
                6:  new modules.Solver2024D06(),
                7:  new modules.Solver2024D07(),
                8:  new modules.Solver2024D08(),
                13: new modules.Solver2024D13(),
                19: new modules.Solver2024D19(),
                22: new modules.Solver2024D22(),
                23: new modules.Solver2024D23(),
                25: new modules.Solver2024D25()
            }
        }
    }

    static solvers = Config.getSolvers();
}
