import { BayesNetworkData, generatePossibleValues, getParents, hashCondition } from "./bayes_network"

export const simulateNetwork = (network: BayesNetworkData) => {
    const nodeKeys = Object.keys(network.nodes);
    const possibleNetworkStates = generatePossibleValues(network, nodeKeys, 0);

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
    return network;
}