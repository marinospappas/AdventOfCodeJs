import {test} from "../aocTest.js";
import {Graph} from "../../aoc/lib/Graph.js";
import {TopologicalSort} from "../../aoc/lib/TopologicalSort.js";

// run from ./test directory

const SKIP = true;
console.log('\n>>> Graph Test <<<');

test('topological sort of simple graph (no cycles)', null)
    .resultOf(() => {
        const graph = new Graph();
        const topologicalSort = new TopologicalSort(graph);
        graph.addNode('A', ['B', 'C']);
        graph.addNode('B', ['C', 'F']);
        graph.addNode('C', ['D', 'F']);
        graph.addNode('E', 'D');
        console.log(graph.toString());
        const topoSorted = topologicalSort.run();
        console.log('topological sort', topoSorted)
        return topoSorted;
    })
    .is(['E','A','B','C','F','D']);

console.log('');
