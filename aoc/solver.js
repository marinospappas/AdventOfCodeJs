export default class Solver {

    get part1() {
        return Solver.runWithElapsed(this.solvePart1, this)
     }

    get part2() {
        return Solver.runWithElapsed(this.solvePart2, this)
    }

    static runWithElapsed(func, scope) {
        const start = new Date()
        const result = func.call(scope)
        const end = new Date()
        return { elapsed: end - start, value: result }
    }
}