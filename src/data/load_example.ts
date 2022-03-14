import { BayesNetworkData } from "./bayes_network";
import { simulateNetwork } from "./simulate_network";

import ex1 from "./examples/Example1.json";

type ExampleID = "Ex1" | "Ex2"

export const exampleNetwork = (example: ExampleID) => {
    let network: BayesNetworkData;
    switch (example) {
        case "Ex1":
            network = ex1;
            break;
        default:
            break;
    }

    simulateNetwork(network);

    return network;
}
