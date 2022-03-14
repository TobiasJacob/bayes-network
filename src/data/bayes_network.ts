
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
                positionX: 400,
                positionY: 400,
            },
            "node1": {
                positionX: 400,
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
