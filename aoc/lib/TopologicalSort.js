import {Stack} from "./Stack.js"

// topological sort of the whole graph with cycle detection
export class TopologicalSort {
    constructor(graph) {
        this.graph = graph;
    }

    run(cycles = null) {
        const stack = new Stack();
        const visited = new Set();
        for (const node of this.graph.getNodes()) {
            if (!visited.has(node))
                this.topologicalSortDfs(node, visited, stack)
        }
        if (cycles !== null) {    // detect cycles
            graph.getConnected(stack.peek()).map(cnx => cnx.id).foreach(cnx => {
                if (stack.has(cnx)) 
                    cycles.push(...stack.toArray().concat([cnx]))
            })
        }
        return stack.toArray();
    }

    // topological sort of part of the graph starting at specific node
    runFromNode(node) {
        const stack = new Stack();
        const visited = new Set();
        this.topologicalSortDfs(node, visited, stack);
        return stack.toArray();
    }
    
    topologicalSortDfs(node, visited, stack) {
        visited.add(node)
        for (const cnx of this.graph.getConnected(node).map(cnx => cnx.id)) {
            if (!visited.has(cnx))
                this.topologicalSortDfs(cnx, visited, stack);
        }
        stack.push(node);
    }
}