import { AocArray } from "../../../aoc/lib/AocArray.js";
import { SimpleGrid } from "../../../aoc/lib/SimpleGrid.js";
import {Solver} from "../../../aoc/Solver.js";
import {Config} from "../../../aoc/Config.js";

// private variables go here
const _locks = new WeakMap();
const _keys = new WeakMap();

export default class LockDecoder extends Solver {

    initialise(data) {
        const grids = AocArray.sliding(data, 7, 8).map(a => new SimpleGrid(a));
        const locks = grids.filter(g => g.getRow(0).every(d => d === '#'))
        const keys = grids.filter(g => g.getRow(0).every(d => d === '.'))
        _locks.set(this, locks);
        _keys.set(this, keys)
    }

    getInputData() {
        return [_locks.get(this), _keys.get(this)];
    }

    keyFits(keyCombi, lockCombi) {
        const LOCK_HEIGHT = 6;
        return [...keyCombi.keys()].every(i => keyCombi[i] + lockCombi[i] < LOCK_HEIGHT) ? 1 : 0
    }

    solvePart1() {
        const [locks, keys] = this.getInputData();  
        const numColumns = locks[0].getMaxX() + 1;
        const locksHeights = locks.map(lock =>
            [...Array(numColumns).keys()].map(i => lock.getColumn(i).filter(c => c === '#').length - 1)
        );
        const keysHeights = keys.map(key =>
            [...Array(numColumns).keys()].map(i => key.getColumn(i).filter(c => c === '#').length - 1)
        );
        return locksHeights.map(lock =>
            keysHeights.map(key => this.keyFits(key, lock))
        ).flat().reduce((acc, curr) => acc + curr, 0);
    }

    solvePart2() {
        return `End of AoC ${Config.year} - Merry Christmas`;
    }
}
