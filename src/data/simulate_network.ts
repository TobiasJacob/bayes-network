import { BayesNetworkData, generatePossibleValues, getParents, hashCondition } from "./bayes_network"

export const simulateNetwork = (network: BayesNetworkData) => {
    const nodeKeys = Object.keys(network.nodes);
    const possibleNetworkStates = generatePossibleValues(network, nodeKeys, 0);
    console.log(possibleNetworkStates);
    console.log(network);

    const probabilities: Record<string, number> = {}
    possibleNetworkStates.forEach((networkState) => {
        console.log(networkState);
        let result = 1.0;
        nodeKeys.forEach((nodeName) => {
            const node = network.nodes[nodeName];
            const parentKeys = getParents(network, nodeName);
            const relevantValues: Record<string, string> = {};
            parentKeys.forEach((nodeValKey) => {
                relevantValues[nodeValKey] = networkState[nodeValKey];
            })
            const hash = hashCondition(relevantValues);
            const nodeValue = networkState[nodeName];
            const valAsStr = (node.table.rows[hash] || {})[nodeValue] || "";
            console.log(node.name, hash, (node.table.rows[hash] || {})[nodeValue]);
            result *= parseFloat(valAsStr);
        });
        probabilities[hashCondition(networkState)] = result;
    });

    return network;

    console.log(probabilities);
    // nodeKeys.forEach((nodeName) => {
    //     const node = network.nodes[nodeName];
    //     const relevantValues: Record<string, string> = {};
    //     Object.keys(node.table.nodeValues).forEach((nodeValKey) => {
    //         relevantValues[nodeValKey] = networkState[nodeValKey];
    //     })
    //     const nodeValue = networkState[nodeName];

    // })
}