import Solver from "../../aoc/solver.js"

export default function SolverDay01() {

    Solver.call(this)

    const list1 = [];
    const list2 = [];

    this.initialise = function (data) {
        const l1 = [], l2 = []
        data.map(line => {
            const parts = line.split(/ +/);
            return { a: parts[0], b: parts[1] }
        }).forEach(element => {
            l1.push(element.a);
            l2.push(element.b);
        });
        list1.push(...l1.sort())
        list2.push(...l2.sort())
    };

    this.solvePart1 = function () {
        let total = 0
        list1.keys().forEach(i => total += Math.abs(list1[i] - list2[i]))
        return (total);
    };

    this.solvePart2 = function () {
        return sum(list1.map(item => item * count(list2, item)))
    };

    function count(array, item) {
        return array.reduce((acc, curr) => (curr === item) ? acc + 1 : acc, 0)
    }
    function sum(array) {
        return array.reduce((acc, curr) => acc + curr, 0)
    }
}
