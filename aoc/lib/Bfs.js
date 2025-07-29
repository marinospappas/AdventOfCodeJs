import { Deque } from "./Deque";

export class Bfs {

    constructor(graph) {
        this.graph = this.graph;
    }

    shortestPath(from, isAtEnd) {
        let curPath =[from];
        const visited = new Set(from);
        const queue = new Deque();
        queue.add(curPath)
        while (!queue.isEmpty) {
            curPath = queue.poll()
            const lastNode = curPath[curPath.size - 1]
            if (isAtEnd(lastNode))   // found path
                return curPath.toList;
            this.graph.getConnected(lastNode).map(node => node.id).forEach(connection => {
                if (!curPath.contains(connection) && !visited.has(connection)) {
                    visited.add(connection)
                    const newPartialPath = [...curPath, connection];
                    queue.add(newPartialPath);
                }
            })
        }
        return [];
    }

    allPaths(from, isAtEnd) {
        const allPaths = []
        let curPath =[from];
        const queue = new Deque();
        queue.add(curPath)
        while (!queue.isEmpty) {
            curPath = queue.removeFront();
            const lastNode = curPath[curPath.size - 1];
            if (isAtEnd(lastNode) && curPath.size > 1)   // found path
                allPaths.push(curPath);
            else
                this.graph.getConnected(lastNode).map(node => node.id).forEach(connectedNode => {
                    if (!curPath.contains(connectedNode)) {
                        const newPartialPath = [...curPath, connectedNode];
                        queue.add(newPartialPath);
                    }
                })
        }
        return allPaths;
    }
}
