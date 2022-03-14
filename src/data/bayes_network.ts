export class ProbabilityTable {
    nodeValues: Record<string, string>
    rows: Record<string, Record<string, number>>
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

export const getDependencies = (network: BayesNetworkData, nodeName: string) => {

}
