export const bfsAlgorithm = (nodes, edges, startNodeId) => {
    const queue = [startNodeId];
    const visitedNodes = new Set();
    const steps = [];

    while (queue.length) {
        const currentNode = queue.shift();
        if (!visitedNodes.has(currentNode)) {
            visitedNodes.add(currentNode);
            steps.push({ visitedNodes: Array.from(visitedNodes) });

            const neighbors = edges
                .filter(edge => edge.source.id === currentNode || edge.target.id === currentNode)
                .map(edge => (edge.source.id === currentNode ? edge.target.id : edge.source.id));

            queue.push(...neighbors.filter(neighbor => !visitedNodes.has(neighbor)));
        }
    }
    return steps;
};
