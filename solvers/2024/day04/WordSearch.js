import {Solver} from "../../../aoc/Solver.js"
import { SimpleGrid } from "../../../aoc/lib/SimpleGrid.js";

// private variables go here
const _list = new WeakMap()

export default class WordSearch extends Solver {

    initialise(data) {
        _list.set(this, new SimpleGrid(data));
    }

    getInputData() {
        return _list.get(this);
    }

    solvePart1() {
    }

    solvePart2() {
    }
}
