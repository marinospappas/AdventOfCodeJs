import { AocArray } from "../../../aoc/lib/AocArray.js";
import { LinearEqSys } from "../../../aoc/lib/LinearEqSys.js";
import {Solver} from "../../../aoc/Solver.js";

// private variables go here
const _movementData = new WeakMap();

export default class ClawMovement extends Solver {

    TOKENS_A = 3;
    TOKENS_B = 1;
    PART2_OFFSET = 10000000000000;

     readButton(s) {
        const matched = s.match(/Button [AB]: X\+(\d+), Y\+(\d+)/);
        return [parseInt(matched[1]), parseInt(matched[2])];
     }

    readPrize(s) {
        const matched = s.match(/Prize: X=(\d+), Y=(\d+)/);
        return [parseInt(matched[1]), parseInt(matched[2])]
    }

    initialise(data) {
        _movementData.set(this,
            AocArray.sliding(data, 4)
                .map(d => { 
                    const clawData = { a: this.readButton(d[0]), b: this.readButton(d[1]), c: this.readPrize(d[2]) }
                    return clawData
                }
            )
        );
    }

    getInputData() {
        return _movementData.get(this);
    }

    solvePart1() {
        const linearEq = new LinearEqSys();
        const movementData = this.getInputData();
        return movementData.map(claw => {
            const solution = linearEq.solve2Long(claw.a, claw.b, claw.c)
            return solution === null ? {a:0, b:0} : {a: solution.x, b: solution.y}
        }).reduce((acc, curr) => acc + curr.a * this.TOKENS_A + curr.b * this.TOKENS_B, 0)
    }

    solvePart2() {
        const linearEq = new LinearEqSys();
        const movementData = this.getInputData();
        return movementData.map(claw => {
            const solution = linearEq.solve2Long(claw.a, claw.b, [claw.c[0] + this.PART2_OFFSET, claw.c[1] + this.PART2_OFFSET]);
            return solution === null ? {a:0, b:0} : {a: solution.x, b: solution.y}
        }).reduce((acc, curr) => acc + curr.a * this.TOKENS_A + curr.b * this.TOKENS_B, 0)
    }
}
