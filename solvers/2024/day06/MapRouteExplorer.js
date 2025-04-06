import {Solver} from "../../../aoc/Solver.js";
import {SimpleGrid} from "../../../aoc/lib/SimpleGrid.js";
import {Point} from "../../../aoc/lib/Point.js";
import { Direction } from "../../../aoc/lib/Direction.js";

// private variables go here
const _grid = new WeakMap();
const _start = new WeakMap();
const [guard, obstacle, obstruction, empty, trace] = ['S', '#', 'O', '.', 'X']

export default class MapRouteExplorer extends Solver {

    initialise(data) {
        const grid = new SimpleGrid(data);
        _grid.set(this, grid);
        _start.set(this, grid.findFirst(guard));
    }

    getInputData() {
        return [_grid.get(this), _start.get(this)];
    }

    // returns false if loop detected
    walkTheMap(grid, start, startDir, route, obstaclePoint = new Point(-1, -1)) {
        let [curPos, curDir] = [start, startDir];
        // a temporary map is used to build the route so that the lookup for previous points in the route can be done fast (as key lookup)        
        const thisRoute = new Map();
        let routeIndex = 0;
        while (grid.getDataPoint(curPos) !== null) {
            if (thisRoute.get([curPos, curDir]))
                return false; // loop detected
            let nextPosition = curPos.plus(curDir.increment);
            while (grid.getDataPoint(nextPosition) === obstacle || nextPosition == obstaclePoint) {
                curDir = curDir.turnRight()
                nextPosition = curPos.plus(curDir.increment);
            }
            thisRoute.set([curPos, curDir], routeIndex++);
            curPos = Point.from(nextPosition);
        }
        // now update the real route
        Array.from(thisRoute.entries()).sort((e1, e2) => e1[1] - e2[1]).forEach(e => route.push(e[0]))
        return true;
    }

    guardRoute = [];

    solvePart1() {
        const mapGrid = _grid.get(this);
        const [_, yDim] = mapGrid.getDimensions();
        const start = _start.get(this);
        if (!this.walkTheMap(mapGrid, start, Direction.N, this.guardRoute))
            throw new Error("Day 6 - no solution found");
        this.guardRoute.forEach (r => { if (!r[0].equals(start)) mapGrid.setDataPoint(r[0], r[1].symbol) });
        const guardRoutePoints = this.guardRoute.map (r => r[0]);
        return new Set(guardRoutePoints.map(p => p.y * yDim + p.x)).size;
    }

    solvePart2() {
        return 0;
    }
}
