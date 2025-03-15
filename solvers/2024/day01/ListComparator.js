import {Solver} from "../../../aoc/Solver.js"
import {AocArray} from "../../../aoc/lib/AocArray.js"

// private variables go here
const _list1 = new WeakMap();
const _list2 = new WeakMap();

export default class ListComparator extends Solver {

    initialise(data) {
        const l1 = [], l2 = [];
        data.map(line => {
            const parts = line.split(/ +/);
            return { a: parts[0], b: parts[1] };
        }).forEach(element => {
            l1.push(element.a);
            l2.push(element.b);
        });
        _list1.set(this, l1.sort());
        _list2.set(this, l2.sort());
    }

    solvePart1() {
        let total = 0;
        const l1 = _list1.get(this);
        const l2 = _list2.get(this);
        l1.keys().forEach(i => total += Math.abs(l1[i] - l2[i]));
        return (total);
    }

    solvePart2() {
        const l1 = _list1.get(this);
        const l2 = _list2.get(this);
        return AocArray.sum(l1.map(item => item * AocArray.count(l2, item)));
    }
}
