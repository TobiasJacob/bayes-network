
export class BayesNodeData {
    positionX: number
    positionY: number
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
            },
            "node1": {
                positionX: 200,
                positionY: 800,
            },
            "node2": {
                positionX: 600,
                positionY: 800,
            },
        },
        connections: {
            "con0": {
                from: "node0",
                to: "node1",
            }
        }
    }
}
