export const bfsAlgorithm = (nodes, edges, startNodeId) => {
    const queue = [startNodeId];
    const visitedNodes = new Set();
    const steps = [];

    while(queue.length){
        const node = queue.shift();
        if(!visitedNodes.has(node)){
            visitedNodes.add(node);
            steps.push([...visitedNodes]);
            
            const neighbours = edges
                .filter(edge => edge.source.id === node || edge.target.id === node)
                .map(edge => (edge.source.id === node ? edge.target.id : edge.source.id));
            queue.push(...neighbours);
        }
    }
    return steps;
};