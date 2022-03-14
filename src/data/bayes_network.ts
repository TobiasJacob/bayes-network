export class ProbabilityTableRow {
    parentValues: Record<string, string>
    probabilities: number
}

export class ProbabilityTable {
    nodeValues: string[]
    rows: ProbabilityTableRow[]
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
                    nodeValues: ["High", "High"],
                    rows: [],
                },
            },
            "node1": {
                positionX: 600,
                positionY: 400,
                name: "Difficulty",
                table:  {
                    nodeValues: ["Difficult", "Easy"],
                    rows: [],
                },
            },
            "node2": {
                positionX: 400,
                positionY: 800,
                name: "Grade",
                table:  {
                    nodeValues: ["A", "B", "C"],
                    rows: [],
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
