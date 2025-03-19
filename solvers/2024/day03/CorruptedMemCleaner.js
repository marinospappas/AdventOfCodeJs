import {Solver} from "../../../aoc/Solver.js"

// private variables go here
const _list = new WeakMap()

export default class CorruptedMemCleaner extends Solver {

    initialise(data) {
        _list.set(this, data.filter(line => line.length > 0 && !line.startsWith('-->>')).join(''));
    }

    getInputData() {
        return _list.get(this);
    }

    solvePart1() {
        const inputData = _list.get(this);
        return this.calcTotalMul(inputData);
    }

    solvePart2() {
        const inputData = _list.get(this);
        return this.calcTotalMul(this.filterDo(inputData));
    }

    matchMul(s) {
        const regex = /^mul\((\d{1,3}),(\d{1,3})\)/;
        const match = s.match(regex);
        return match ? [parseInt(match[1]), parseInt(match[2])] : null;
    }

    matchDo(s) {
        const regex = /^do\(\)/;
        return s.match(regex);
    }

    matchDont(s) {
        const regex = /^don't\(\)/;
        return s.match(regex);
    }

    calcTotalMul(s) {
        const mul = [];
        let i = 0;
        while (i < s.length) {
            if (s[i] === 'm') {
                const match = this.matchMul(s.substring(i));
                if (match !== null) {
                    mul.push({a: match[0], b: match[1]});
                    i += 7;
                }
            } 
            ++i;
        }
        return mul.reduce((acc, cur) => acc + cur.a * cur.b, 0);
    }

    filterDo(s) {
        const result = [];
        let i1 = 0;
        let i2 = 0;
        while (i1 < s.length && i2 < s.length) {
            i2 = s.substring(i1).indexOf("don't()");
            i2 = (i2 < 0) ? s.length : i2 + i1;
            result.push(s.substring(i1, i2))
            i2 += 7;
            i1 = i2 + s.substring(i2).indexOf('do()');
        }
        return result.join('');
    }
}
