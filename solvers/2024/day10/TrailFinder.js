import {Solver} from "../../../aoc/Solver.js";
import {SimpleGrid} from "../../../aoc/lib/SimpleGrid.js";
import {Graph} from "../../../aoc/lib/Graph.js";

// private variables go here
const _grid = new WeakMap();
const _graph = new WeakMap();

export default class TrailFinder extends Solver {

    initialise(data) {
        const grid = new SimpleGrid(data);
         _grid.set(this, grid);
         _graph.set(this, this.initGraph(grid));
    }

    initGraph(data) {
        const graph = new Graph();

        return graph;

    }

    getInputData() {
        return [_grid.get(this), _graph.get(this)];
    }

    solvePart1() {
        return '';
    }

    solvePart2() {
        return '';
    }
}
