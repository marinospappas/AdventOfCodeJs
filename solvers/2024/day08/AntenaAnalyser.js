import {Solver} from "../../../aoc/Solver.js";
import {SimpleGrid} from "../../../aoc/lib/SimpleGrid.js";
import {Point} from "../../../aoc/lib/Point.js";
import { Direction } from "../../../aoc/lib/Direction.js";

// private variables go here
const _grid = new WeakMap();
const ANTENNA_CODES = new Set(Array.from(
        { length: 'z'.charCodeAt(0) - '0'.charCodeAt(0) + 1 },
        (_, i) => String.fromCharCode('0'.charCodeAt(0) + i)
    ));
const EMPTY = '.';
const ANTI_NODE = '#';

export default class AntenaAnalyser extends Solver {

    initialise(data) {
        const grid = new SimpleGrid(data);
        _grid.set(this, grid);
    }

    getInputData() {
        return [_grid.get(this), ANTENNA_CODES];
    }

    findFirstAntiNodes(p1, p2, grid) {
        const antennaDistance = p2.minus(p1);
        return [p2.plus(antennaDistance), p1.minus(antennaDistance)].filter(p => grid.isInsideGrid(p));
    }

    findAllAntiNodes(p1, p2, grid) {
        const antennaDistance = p2.minus(p1);
        const antinodes = [];
        for (const dir of [1, -1]) {
            let nextAntinode = p2;
            while (grid.isInsideGrid(nextAntinode)) {
                antinodes.push(nextAntinode);
                nextAntinode = nextAntinode.plus(antennaDistance.times(dir));
            }
        }
        return antinodes;
    }

    toAntinodes(antennas, grid, part) {
        const antinodes = [];
        for (const points of  Object.values(antennas)) {
            for (const p1 of points) 
                for (const p2 of points)
                    if (!p1.equals(p2)) 
                        if (part === 1)
                            antinodes.push(...this.findFirstAntiNodes(p1, p2, grid));
                        else
                            antinodes.push(...this.findAllAntiNodes(p1, p2, grid));
        }
        return new Set(antinodes.map(p => p.toInt()));
    }

    solvePart1() {
        const grid = _grid.get(this);
        var antennas = {};
        [...grid.getAllDataValues()].filter(c => c != EMPTY).forEach(c => antennas[c] = grid.findAll(c));
        return this.toAntinodes(antennas, grid, 1).size;
    }

    solvePart2() {
         const grid = _grid.get(this);
        var antennas = {};
        [...grid.getAllDataValues()].filter(c => c != EMPTY).forEach(c => antennas[c] = grid.findAll(c));
        return this.toAntinodes(antennas, grid, 2).size;
    }
}
