import {Solver} from "../../../aoc/Solver.js"
import {Graph} from "../../../aoc/lib/Graph.js";
import {TopologicalSort} from "../../../aoc/lib/TopologicalSort.js";

// private variables go here
const _rules = new WeakMap()
const _pagesList = new WeakMap()

export default class PrintingRules extends Solver {

    initialise(data) {
        const emptyIndx = data.indexOf('');
        const inp1 = data.slice(0, emptyIndx);
        const inp2 = data.slice(emptyIndx + 1, data.length);
        _rules.set(this, new Graph(inp1.map(line => line.split('|').map(s => parseInt(s)))));
        _pagesList.set(this, inp2.map(line => line.split(',').map(s => parseInt(s))));
    }

    getInputData() {
        return [_rules.get(this), _pagesList.get(this)];
    }

    solvePart1() {
        
    }

    solvePart2() {
      
    }
}
