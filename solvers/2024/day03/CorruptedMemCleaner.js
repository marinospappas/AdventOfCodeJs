import {Solver} from "../../../aoc/Solver.js"

// private variables go here
const _list = new WeakMap()

export default class CorruptedMemCleaner extends Solver {

    initialise(data) {
        _list.set(this, data.filter(line => line.length > 0 && !line.startsWith('-->>')).join());
    }

    getInputData() {
        return _list.get(this);
    }
    
    solvePart1() {
        const inpData = _list.get(this);
        return inpData;
    }

    solvePart2() {
        
    }
}
