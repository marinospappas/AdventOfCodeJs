import {Solver} from "../../../aoc/Solver.js"
import {SimpleGrid} from "../../../aoc/lib/SimpleGrid.js";
import {Direction} from "../../../aoc/lib/Direction.js";
import {AocArray} from "../../../aoc/lib/AocArray.js";

// private variables go here
const _grid = new WeakMap()

export default class WordSearch extends Solver {

    initialise(data) {
        _grid.set(this, new SimpleGrid(data));
        this.searchWord = "XMAS"
        this.wordStart = {p1: this.searchWord[0], p2: 'A'};
    }

    getInputData() {
        return _grid.get(this);
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

    matchesXMas(p, grid) {
        return grid.getDataPoint(p) === this.wordStart.p2 && AocArray.contains(['MMSS', 'SMMS', 'SSMM', 'MSSM'], 
            [Direction.NW, Direction.NE, Direction.SE, Direction.SW].map(dir => grid.getDataPoint(p.plus(dir.increment))).join('')
        );
    }

    solvePart1() {
        const grid = _grid.get(this);
        return grid.getAllPoints().map( p => this.countWordMatches(p, grid) ).reduce((acc, cur) => acc + cur, 0);
    }

    solvePart2() {
        const grid = _grid.get(this);
        return grid.getAllPoints().filter( p => this.matchesXMas(p, grid) ).length;
    }
}
