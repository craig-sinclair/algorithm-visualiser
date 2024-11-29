export const dfsAlgorithm = (nodes, edges, startingNode) => {
    const stack = [startingNode];
    const visitedNodes = new Set();
    const steps = [];

    while (stack.length) {
        const currentNode = stack.pop();

        if (!visitedNodes.has(currentNode)) {
            visitedNodes.add(currentNode);
            steps.push({ visitedNodes: Array.from(visitedNodes) });

            const neighbors = edges
                .filter(edge => edge.source.id === currentNode || edge.target.id === currentNode)
                .map(edge => (edge.source.id === currentNode ? edge.target.id : edge.source.id));

            neighbors.forEach(neighbor => {
                if (!visitedNodes.has(neighbor)) {
                    stack.push(neighbor);
                }
            });
        }
    }
    return steps;
};
