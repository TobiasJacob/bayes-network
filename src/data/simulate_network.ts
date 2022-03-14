import { BayesNetworkData, generatePossibleValues, getParents, hashCondition } from "./bayes_network"

export const simulateNetwork = (network: BayesNetworkData) => {
    // Generate all possible states
    const nodeKeys = Object.keys(network.nodes);
    let possibleNetworkStates = generatePossibleValues(network, nodeKeys, 0);

    // Filter all possible states according to selected values
    const selectedValues: Record<string, string> = {};
    nodeKeys.forEach((nodeName) => {
        const node = network.nodes[nodeName];
        if (node.selectedValue) {
            selectedValues[nodeName] = node.selectedValue;
        }
    });
    possibleNetworkStates = possibleNetworkStates.filter((networkState) => {
        for (const nodeName in selectedValues) {
            if (Object.prototype.hasOwnProperty.call(selectedValues, nodeName)) {
                const value = selectedValues[nodeName];
                if (value !== networkState[nodeName]) {
                    return false;
                }
            }
        }
        return true;
    })

    // Find probabilities for all possible states
    const probabilities: Record<string, number> = {}
    possibleNetworkStates.forEach((networkState) => {
        // Iterate over each possible network configuration
        let result = 1.0; // The total probability of the network configuration
        nodeKeys.forEach((nodeName) => {
            const node = network.nodes[nodeName];
            const parentKeys = getParents(network, nodeName);
            // Find the corresponding probabilitiy value using the relevant conditional probabilities and the node value
            const relevantValues: Record<string, string> = {}; // The conditions that apply for this probability
            parentKeys.forEach((nodeValKey) => {
                relevantValues[nodeValKey] = networkState[nodeValKey];
            })
            const hash = hashCondition(relevantValues);
            const nodeValue = networkState[nodeName]; // The value of the node
            const valAsStr = (node.table.rows[hash] || {})[nodeValue] || "";
            // Multiply the total probability with this factor
            result *= parseFloat(valAsStr);
        });
        probabilities[hashCondition(networkState)] = result;
    });

    // Sum probabilities for all possible states
    nodeKeys.forEach((nodeName) => {
        const node = network.nodes[nodeName];
        Object.keys(node.table.nodeValues).forEach((nodeVal) => {
            // Calculate probability of a certain value nodeValKey within a node nodeName
            let totalProbability = 0;
            possibleNetworkStates.forEach((networkState) => {
                if (networkState[nodeName] === nodeVal) {
                    totalProbability += probabilities[hashCondition(networkState)];
                }
            })
            network.nodes[nodeName].table.nodeProbabilities[nodeVal] = totalProbability;
        })
    })

    // Normalize probabilities to 1.0
    let totalProbability = 0.0;
    Object.values(probabilities).forEach((val) => {
        totalProbability += val;
    });
    nodeKeys.forEach((nodeName) => {
        const node = network.nodes[nodeName];
        Object.keys(node.table.nodeValues).forEach((nodeVal) => {
            node.table.nodeProbabilities[nodeVal] *= 1 / totalProbability;
        })
    })

    return network;
}