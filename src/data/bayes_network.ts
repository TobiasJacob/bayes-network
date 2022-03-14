export class ProbabilityTable {
    nodeValues: Record<string, string>
    rows: Record<string, Record<string, string>>
}

export class BayesNodeData {
    positionX: number
    positionY: number
    name: string
    table: ProbabilityTable
}

export class Connection {
    from: string
    to: string
}

export class BayesNetworkData {
    nodes: Record<string, BayesNodeData>
    connections: Record<string, Connection>
}

export const exampleNetwork: () => BayesNetworkData = () => {
    return {
        nodes: {
            "node0": {
                positionX: 200,
                positionY: 400,
                name: "Intelligence",
                table:  {
                    nodeValues: {"0": "High", "1": "Low"},
                    rows: {},
                },
            },
            "node1": {
                positionX: 600,
                positionY: 400,
                name: "Difficulty",
                table:  {
                    nodeValues: {"0": "Difficult", "1": "Easy"},
                    rows: {},
                },
            },
            "node2": {
                positionX: 400,
                positionY: 800,
                name: "Grade",
                table:  {
                    nodeValues: {"0": "A", "1": "D"},
                    rows: {},
                },
            },
        },
        connections: {
            "con0": {
                from: "node0",
                to: "node2",
            },
            "con1": {
                from: "node1",
                to: "node2",
            },
        }
    }
}

export const existsConnection = (network: BayesNetworkData, from: string, to: string) => {
    for (const key in network.connections) {
        if (Object.prototype.hasOwnProperty.call(network.connections, key)) {
            const conn = network.connections[key];
            if (conn.from == from && conn.to == to) {
                return true;
            }
        }
    }
    return false;
}

export const getParents = (network: BayesNetworkData, nodeName: string) => {
    return Object.keys(network.nodes).filter((nodeKey) => {
        for (const connKey in network.connections) {
            if (Object.prototype.hasOwnProperty.call(network.connections, connKey)) {
                const conn = network.connections[connKey];
                if (conn.from == nodeKey && conn.to === nodeName) return true;
            }
        }
        return false;
    })
}

const generatePossibleValues = (network: BayesNetworkData, parentIDs: string[], index: number) => {
    if (index >= Object.keys(parentIDs).length) return [{}];
    const nodeName = parentIDs[index];

    const result: Record<string, string>[] = [];
    const recValues = generatePossibleValues(network, parentIDs, index + 1);
    const possibleValues = Object.keys(network.nodes[nodeName].table.nodeValues);
    possibleValues.forEach((currentVal) => {
        recValues.forEach((recVal) => {
            result.push({
                ...recVal,
                [nodeName]: currentVal,
            });
        });
    });

    return result;
}

export const getConditionCombinations = (network: BayesNetworkData, nodeName: string) => {
    const parentKeys = getParents(network, nodeName);
    // console.log(parentKeys);
    
    const result = generatePossibleValues(network, parentKeys, 0);
    // console.log(result);
    return result;
}

export const hashCondition = (cond: Record<string, string>) => {
    let res = "";
    Object.entries(cond).forEach(([k, v]) => {
        res += k + "=" + v + ",";
    })
    return res;
}
