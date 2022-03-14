export class ProbabilityTable {
    /**
     * Represents the probability table
     */
    nodeValues: Record<string, string> // The values a node can be set to. A record of valueID -> displayText
    nodeProbabilities: Record<string, number> // The probabilities of the event
    rows: Record<string, Record<string, string>> // Contains a map of conditionID -> valueID -> probability, where probability is expressed as string to make editing easier
}

export class BayesNodeData {
    /**
     * Represents the full bayes node.
     */
    positionX: number // Position X of the node
    positionY: number // Position Y of the node
    name: string // Display name of the node
    table: ProbabilityTable // The probability table
    selectedValue?: string // The value a user might have observed
    parents: string[] // The parents of this node
}

export class BayesNetworkData {
    /**
     * Represents a bayesian network.
     */
    nodes: Record<string, BayesNodeData> // All nodes of the network. The edges are acessible via the parents property.
}

export const existsConnection = (network: BayesNetworkData, from: string, to: string) => {
    /**
     * Checks if there is a connection between two nodes.
     */
    return network.nodes[to].parents.includes(from);
}

export const getParents = (network: BayesNetworkData, nodeName: string) => {
    /**
     * Returns the parents of a node.
     */
    return network.nodes[nodeName].parents;
}

export const generatePossibleValues = (network: BayesNetworkData, parentIDs: string[], index: number = 0) => {
    /**
     * Recursive funciton to generate all possible conditions a certain node might assume based on the parents of the node.
     */
    if (index >= Object.keys(parentIDs).length) return [{}];
    const nodeName = parentIDs[index];

    const result: Record<string, string>[] = [];
    const recValues = generatePossibleValues(network, parentIDs, index + 1);
    const possibleValues = Object.keys(network.nodes[nodeName].table.nodeValues);
    possibleValues.forEach((currentVal) => {
        recValues.forEach((recVal) => {
            result.push({
                ...recVal,
                [nodeName]: currentVal,
            });
        });
    });

    return result;
}

export const getConditionCombinations = (network: BayesNetworkData, nodeName: string) => {
    /**
     * Returns all possible conditions a certain node might assume based on the parents of the node.
     */
    const parentKeys = getParents(network, nodeName);
    const result = generatePossibleValues(network, parentKeys);
    return result;
}

export const hashCondition = (cond: Record<string, string>) => {
    /**
     * Helper function to hash a condition to a string which can be used to access probabilities.
     */
    let res = "";
    const keys = Object.entries(cond);
    keys.sort();
    keys.forEach(([k, v]) => {
        res += k + "=" + v + ",";
    })
    return res;
}

export const getRowCount = (network: BayesNetworkData, nodeName: string) => {
    /**
     * Returns the number of rows a node has in its condition table. This is exponential with respect to the number of parents.
     */
    const parents = getParents(network, nodeName);
    let rows = 1;
    parents.forEach((parentName) => {
        rows *= Object.keys(network.nodes[parentName].table.nodeValues).length;
    })
    return rows;
}
