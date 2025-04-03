import {test, isEqual} from "../aocTest.js";
import {Graph} from "../../aoc/lib/Graph.js";

// run from ./test directory

const SKIP = true;
console.log('\n>>> Graph Test <<<');

test('graph is created empty', null)
    .resultOf(() => {
        const graph = new Graph();
        console.log(graph.toString())
        return graph.isEmpty();
    })
    .is(true);

test('graph created using constructor param', null)
    .resultOf(() => {
        const graph = new Graph([['A', [{id:'B', cost:1}, {id:'C', cost:1}]], ['B', [{id:'C', cost:1}]], ['C', []]]);
        console.log(graph.toString())
        return graph.size;
    })
    .is(3);

test('returns graph nodes', null)
    .resultOf(() => {
        const graph = new Graph([['A', [{id:'B', cost:1}, {id:'C', cost:1}]], ['B', [{id:'C', cost:1}]], ['C', []]]);
        return graph.getNodes();
    })
    .is(['A','B','C']);

test('returns connections for each node', null)
    .resultOf(() => {
        const graph = new Graph([['A', [{id:'B', cost:1}, {id:'C', cost:1}]], ['B', [{id:'C', cost:1}]], ['C', []]]);
        const cnxA = graph.getConnected('A');
        const cnxB = graph.getConnected('B');
        const cnxC = graph.getConnected('C');
        console.log(cnxA)
        console.log(cnxB)
        console.log(cnxC)
        return isEqual(cnxA, [{id:'B', cost:1}, {id:'C', cost:1}]) && isEqual(cnxB, [{id:'C', cost:1}]) && cnxC.length === 0;
    })
    .is(true);

test('graph created empty has nodes added later', null)
    .resultOf(() => {
        const graph = new Graph();
        graph.addNode('A', ['B', 'C']);
        graph.addNode('B', ['C']);
        graph.addNode('C');
        const cnxA = graph.getConnected('A');
        const cnxB = graph.getConnected('B');
        const cnxC = graph.getConnected('C');
        console.log(graph.toString());
        return isEqual(cnxA, [{id:'B', cost:1}, {id:'C', cost:1}]) && isEqual(cnxB, [{id:'C', cost:1}]) 
            && cnxC.length === 0 && isEqual(graph.getNodes(), ['A', 'B', 'C']);
    })
    .is(true);

test('graph created empty has nodes connected both ways', null)
    .resultOf(() => {
        const graph = new Graph();
        graph.addNode('A', ['B', 'C'], true);
        graph.addNode('C', 'D', true);
        const cnxA = graph.getConnected('A');
        const cnxB = graph.getConnected('B');
        const cnxC = graph.getConnected('C');
        const cnxD = graph.getConnected('D');
        console.log(graph.toString());
        return isEqual(cnxA, [{id:'B', cost:1}, {id:'C', cost:1}]) && isEqual(cnxB, [{id:'A', cost:1}]) 
        && isEqual(cnxC, [{id:'A', cost:1}, {id:'D', cost:1}]) && isEqual(cnxD, [{id:'C', cost:1}]) 
        && isEqual(graph.getNodes(), ['A', 'B', 'C', 'D']);
    })
    .is(true);

test('graph has nodes added with cost to connected nodes', null)
    .resultOf(() => {
        const graph = new Graph();
        graph.addNode('A', [{id:'B', cost:3}, {id:'C', cost:2}]);
        graph.addNode('C', [{id:'B', cost:4}]);
        const cnxA = graph.getConnected('A');
        const cnxB = graph.getConnected('B');
        const cnxC = graph.getConnected('C');
        console.log(graph.toString());
        return isEqual(cnxA, [{id:'B', cost:3}, {id:'C', cost:2}]) && isEqual(cnxB, []) && isEqual(cnxC, [{id:'B', cost:4}]) 
        && isEqual(graph.getNodes(), ['A', 'B', 'C']);
    })
    .is(true);

console.log('');
