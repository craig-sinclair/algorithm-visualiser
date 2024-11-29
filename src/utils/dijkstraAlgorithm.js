export const dijkstraAlgorithm = (nodes, edges, startNodeId) => {
    const steps = [];
    const distances = {};
    const visitedNodes = new Set();

    nodes.forEach(node => {
        distances[node.id] = Infinity;
    });
    distances[startNodeId] = 0;

    const unvisitedNodes = [...nodes];

    while (unvisitedNodes.length > 0) {
        const currentNode = unvisitedNodes.reduce((minNode, node) =>
            distances[node.id] < distances[minNode.id] ? node : minNode
        );

        if (distances[currentNode.id] === Infinity) break;

        visitedNodes.add(currentNode.id);
        unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1);

        steps.push({
            visitedNodes: Array.from(visitedNodes),
            distances: { ...distances },
        });

        edges
            .filter(edge => edge.source.id === currentNode.id && !visitedNodes.has(edge.target.id))
            .forEach(edge => {
                const newDistance = distances[currentNode.id] + edge.weight;
                if (newDistance < distances[edge.target.id]) {
                    distances[edge.target.id] = newDistance;
                }
            });
    }

    return steps;
};
