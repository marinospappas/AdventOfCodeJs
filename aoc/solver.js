export default function Solver() {
    Object.defineProperty(this, 'part1', {
        get: function() {
            return runWithElapsed(this['solvePart1'], this)
        }
    })

    Object.defineProperty(this, 'part2', {
        get: function() {
            return runWithElapsed(this['solvePart2'], this)
        }
    })

    function runWithElapsed(func, scope) {
        const start = new Date()
        const result = func.call(scope)
        const end = new Date()
        return { elapsed: end - start, value: result }
    }
}