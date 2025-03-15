import {Solver} from "../../../aoc/Solver.js"
import {AocArray} from "../../../aoc/lib/AocArray.js"

// private variables go here
const _list = new WeakMap()

export default class ReportAnalyser extends Solver {

    initialise(data) {
        const l1 = [];
        l1.push(...data.map(line => line.split(/ +/)));
        _list.set(this, l1);
    }

    solvePart1() {
        const dataList = _list.get(this);
        return dataList.reduce((acc, curr) => this.isSafe(curr) ? acc + 1 : acc, 0);
    }

    solvePart2() {
        const safeCount = this.solvePart1();
        const dataList = _list.get(this);
        const unsafeToSafeCount = dataList.filter(l => !this.isSafe(l)).map(l => {
            for (let i in l) {
                const arr = Array.from(l);
                arr.splice(i, 1);
                if (this.isSafe(arr))
                    return 1;
            }
            return 0
        }).reduce((acc, cur) => acc + cur);
        return safeCount + unsafeToSafeCount;
    }

    isSafe(list) {
        if (list.length < 2)
            return true;
        const direction = this.getDirection(list[1], list[0]);
        const result =  list.reduce((acc, curr, index, arr) => (index < arr.length - 1) 
            ? acc && this.getDirection(arr[index + 1], curr) === direction &&
                Math.abs(arr[index + 1] - curr) <= 3 &&  Math.abs(arr[index + 1] - curr) >= 1 
            : acc,
        true);
        return result;
    }
    
    getDirection(n1, n2) {
        return (n2 - n1) / Math.abs(n2 - n1);
    }
}
