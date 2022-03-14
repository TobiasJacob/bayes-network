import { BayesNetworkData } from "./bayes_network";
import { simulateNetwork } from "./simulate_network";


export const exampleNetwork: () => BayesNetworkData = () => {
    const network: BayesNetworkData = {
        nodes: {
            "node0": {
                positionX: 200,
                positionY: 400,
                name: "Intelligence",
                table:  {
                    nodeValues: {"val0": "High", "val1": "Low"},
                    nodeProbabilities: {"val0": parseFloat('Nan'), "val1": parseFloat('Nan')},
                    rows: {},
                },
            },
            "node1": {
                positionX: 600,
                positionY: 400,
                name: "Difficulty",
                table:  {
                    nodeValues: {"val0": "Difficult", "val1": "Easy"},
                    nodeProbabilities: {"val0": parseFloat('Nan'), "val1": parseFloat('Nan')},
                    rows: {},
                },
            },
            "node2": {
                positionX: 400,
                positionY: 800,
                name: "Grade",
                table:  {
                    nodeValues: {"val0": "A", "val1": "D"},
                    nodeProbabilities: {"val0": parseFloat('Nan'), "val1": parseFloat('Nan')},
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

    simulateNetwork(network);

    return network;
}
