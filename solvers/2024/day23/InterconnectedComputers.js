import { AocArray } from "../../../aoc/lib/AocArray.js";
import {Solver} from "../../../aoc/Solver.js";

// private variables go here
const _connections = new WeakMap();
const _allIds = new WeakMap();

export default class InterconnectedComputers extends Solver {

    initialise(data) {
        const dataArray = data.map(line => line.split('-'));
        _connections.set(this, new Set(dataArray.map(element => element.sort().join(''))));
        _allIds.set(this, new Set(dataArray.flat()))
    }

    getInputData() {
        return [_connections.get(this), _allIds.get(this)];
    }

    findConnectedSetsN(n, connections, allIds, connectedGroupsN) {
        let groupSize = 2;
        let conGroups = new Set(connectedGroupsN);
        while (groupSize < n) {
            const result = new Set();
            // for each group in the current connected groups
            for (let group of conGroups) {
                for (let id of allIds.difference(new Set(AocArray.fromString(group, 2)))) {
                    if (group.includes(id)) continue;
                    // check if all ids in group are connected to 'id'
                    if (AocArray.fromString(group, 2).every(id1 => connections.has(id < id1 ? id + id1 : id1 + id)))
                        result.add(AocArray.fromString(group + id, 2).sort().join(''));
                }
            }
            if (result.size === 0) break;
            conGroups = new Set(result);
            groupSize += 1                
            console.log(`group size: ${groupSize}`)
        }
        return conGroups;
    }

    maxGroupSize = 0;

    solvePart1() {
        const [connections, allIds] = this.getInputData();  
        let connectedGroups = this.findConnectedSetsN(3, connections, allIds, connections);
        this.maxGroupSize = connectedGroups.size;
        return [...connectedGroups].filter(s => s[0] === 't' || s[2] === 't' || s[4] === 't').length;
    }

    solvePart2() {
        const [connections, allIds] = this.getInputData();  
        let connectedGroups = this.findConnectedSetsN(this.maxGroupSize, connections, allIds, connections);
        return AocArray.fromString([...connectedGroups][0], 2).join(',');
    }
}
