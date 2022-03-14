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
                    rows: {
                        "": {"val0": "0.5", "val1": "0.5"}
                    },
                },
                parents: [],
            },
            "node1": {
                positionX: 600,
                positionY: 400,
                name: "Difficulty",
                table:  {
                    nodeValues: {"val0": "Difficult", "val1": "Easy"},
                    nodeProbabilities: {"val0": parseFloat('Nan'), "val1": parseFloat('Nan')},
                    rows: {
                        "": {"val0": "0.5", "val1": "0.5"}
                    },
                },
                parents: [],
            },
            "node2": {
                positionX: 400,
                positionY: 800,
                name: "Grade",
                table:  {
                    nodeValues: {"val0": "A", "val1": "D"},
                    nodeProbabilities: {"val0": parseFloat('Nan'), "val1": parseFloat('Nan')},
                    rows: {
                        "node0=val0,node1=val0,": {"val0": "0.5", "val1": "0.5"},
                        "node0=val0,node1=val1,": {"val0": "0.9", "val1": "0.1"},
                        "node0=val1,node1=val1,": {"val0": "0.5", "val1": "0.5"},
                        "node0=val1,node1=val0,": {"val0": "0.1", "val1": "0.9"},
                    },
                },
                parents: ["node0", "node1"],
            },
        }
    }

    simulateNetwork(network);

    return network;
}
