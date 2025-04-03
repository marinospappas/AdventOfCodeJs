export class Graph {
    // nodes = Object {
    //      id (T): connected ([{id: T, cost: Int}, ...]),
    //      ...
    // }
    // customGetConnected = (id) => [{id: T, cost: Int}, ...]
    constructor(data = [], customGetConnected = null) {
        this.nodes = new Map();
        for (const node of data) {
            this.addNode(node[0], node[1])
        }
        this.customGetConnected = customGetConnected;
    }
    
    getConnected(id) {
        return this.customGetConnected !== null ? this.customGetConnected(id) : this.nodes.get(id);
    }

    getNodes() {
        return Array.from(this.nodes.keys());
    }

    addNode(id, connected = [], connectBothWays = false) {
        if (this.nodes.get(id) === undefined)
            this.nodes.set(id, []);
        if (Array.isArray(connected))
            connected.forEach( cnx => this.addConnection(id, cnx) );
        else
            this.addConnection(id, connected);
        if (connectBothWays) 
            if (Array.isArray(connected))
                connected.forEach( cnx => this.addNode(cnx.id || cnx, [{id: id, cost: cnx.cost || 1}]) )
            else
                this.addNode(connected.id || connected, {id: id, cost: connected.cost || 1 })
    }

    addConnection(node, connection) {
        const id = connection.id || connection;
        const cost = connection.cost || 1;
        this.nodes.get(node).push({id: id, cost: cost})
        if (this.nodes.get(id) === undefined)
            this.nodes.set(id, []);
    }

    get size() {
        return this.nodes.size;
    }

    isEmpty() {
        return this.nodes.size === 0;
    }

    toString() {
        let s = "[Graph]\n";
        let count = 0;
        Array.from(this.nodes.entries()).forEach(e => {
            count += 1;
            s += `node ${count}: ${e[0]} connected to: ${e[1].map(c => '{' + c.id + ',' + c.cost + '}')}\n`;
        });
        return s;
    }
}