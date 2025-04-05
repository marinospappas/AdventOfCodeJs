import {Solver} from "../../../aoc/Solver.js"
import {Graph} from "../../../aoc/lib/Graph.js";
import {TopologicalSort} from "../../../aoc/lib/TopologicalSort.js";

// private variables go here
const _rules = new WeakMap()
const _pagesLists = new WeakMap()

export default class PrintingRules extends Solver {

    initialise(data) {
        const emptyIndx = data.indexOf('');
        const inp1 = data.slice(0, emptyIndx);
        const inp2 = data.slice(emptyIndx + 1, data.length);
        _rules.set(this, inp1.map(line => line.split('|').map(s => parseInt(s))));
        _pagesLists.set(this, inp2.map(line => line.split(',').map(s => parseInt(s))));
    }

    getInputData() {
        return [_rules.get(this), _pagesLists.get(this)];
    }

    areAllPagesInOrder(list, graph) {
        return list.reduce((acc, cur, index, array) => 
            index === 0 ? true : acc && graph.getConnected(array[index - 1]).map(cnx => cnx.id).indexOf(cur) >= 0, true);
    }

    solvePart1() {
        const rules = _rules.get(this);
        const graph = new Graph(rules);
        const pagesLists = _pagesLists.get(this);
        return pagesLists
            .filter(pages => this.areAllPagesInOrder(pages, graph))
            .reduce((acc, cur) => 
                acc + cur[Math.floor(cur.length / 2)], 0);
    }

    solvePart2() {
        const rules = _rules.get(this);
        const pagesLists = _pagesLists.get(this);
        const unorderedLists = pagesLists.filter(pages => !this.areAllPagesInOrder(pages, new Graph(rules)));
        const sortedLists = unorderedLists.map(pages => {
            const graph = new Graph(rules.filter(r => pages.indexOf(r[0]) >= 0 && pages.indexOf(r[1] >= 0)));
            const sortOrder = new TopologicalSort(graph).run();
            return pages.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b))
        });
        return sortedLists.reduce((acc, cur) => acc + cur[Math.floor(cur.length / 2)], 0);
    }
}
