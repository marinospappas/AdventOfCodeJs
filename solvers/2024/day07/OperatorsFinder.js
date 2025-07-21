import {Solver} from "../../../aoc/Solver.js";

// private variables go here
const _inputData = new WeakMap();

export default class OperatorsFinder extends Solver {

    initialise(data) {
        const dataSplit = data.map(l => l.split(':'))
        const inputData = dataSplit. map(d => [parseInt(d[0]), d[1].toString().trim().split(' ').map(s => parseInt(s))]);
        _inputData.set(this, inputData);
    }

    getInputData() {
        return _inputData.get(this);
    }

    matchTwo(n1, n2, expected, part2) {
        return n1 + n2 == expected || n1 * n2 == expected || (part2 && parseInt(n1.toString() + n2.toString()) == expected)
    }

    matchList(list, expected, part2 = false) {
        if (list.length == 2)
            return this.matchTwo(list[0], list[1], expected, part2)
        else {
            const fistPart = list.slice(0, list.length - 1)
            const lastItem = list[list.length - 1]
            return expected > lastItem && this.matchList(fistPart, expected - lastItem, part2)
                || expected % lastItem == 0 && this.matchList(fistPart, expected / lastItem, part2)
                || part2 && expected.toString().length > lastItem.toString().length && expected.toString().endsWith(lastItem)
                    && this.matchList(fistPart, parseInt(expected.toString().slice(0, -lastItem.toString().length)), part2)
        }
    }

    solvePart1() {
        const inputData = this.getInputData()
        return inputData.reduce((acc, curr) => this.matchList(curr[1], curr[0], false) ? acc + curr[0] : acc, 0);
    }

    solvePart2() {
        const inputData = this.getInputData()
        return inputData.reduce((acc, curr) => this.matchList(curr[1], curr[0], true) ? acc + curr[0] : acc, 0);
    }
}
