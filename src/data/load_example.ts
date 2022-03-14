import { BayesNetworkData } from "./bayes_network";
import { simulateNetwork } from "./simulate_network";

import exDIG from "./examples/ExampleDIG.json";
import exDIGSR from "./examples/ExampleDIGSR.json";
import exDBD from "./examples/ExampleDBD.json";

type ExampleID = "Ex1" | "Ex2" | "Ex3" | "New"

export const exampleNetwork = (example: ExampleID) => {
    let network: BayesNetworkData;
    switch (example) {
        case "Ex1":
            network = exDIG;
            break;
        case "Ex2":
            network = exDIGSR;
            break;
        case "Ex3":
            network = exDBD;
            break;
        default:
            network = {
                nodes: {}
            };
            break;
    }

    simulateNetwork(network);

    return network;
}
