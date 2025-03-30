import {Solver} from "../../../aoc/Solver.js"
import {SimpleGrid} from "../../../aoc/lib/SimpleGrid.js";
import {Direction} from "../../../aoc/lib/Direction.js";
import {Point} from "../../../aoc/lib/Point.js";

// private variables go here
const _list = new WeakMap()

export default class WordSearch extends Solver {

    initialise(data) {
        _list.set(this, new SimpleGrid(data));
        this.searchWord = "XMAS"
        this.wordStart = {p1: this.searchWord[0], p2: 'A'};
    }

    getInputData() {
        return _list.get(this);
    }

    getWord(point, direction, grid) {
        return Array.from(Array(this.searchWord.length).keys())
            .map( i => grid.getDataPoint(point.plus(direction.increment.times(i))) )
            .join('');
    }

    countWordMatches(p, grid) {
        if (grid.getDataPoint(p) !== this.wordStart.p1)
            return 0;
        else 
            return Direction.ALL_DIRECTIONS.filter(dir => this.getWord(p, dir, grid) === this.searchWord).length;
    }

    solvePart1() {
        const grid = _list.get(this);
        return grid.getAllPoints().map( p => this.countWordMatches(p, grid) ).reduce((acc, cur) => acc + cur, 0);
    }

    solvePart2() {
    }
}
