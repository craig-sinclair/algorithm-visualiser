export const dfsAlgorithm = (nodes, edges, startingNode) => {
    const stack = [startingNode];
    const visitedNodes = new Set();
    const steps = [];

    while(stack.length){
        const node = stack.pop()

        if(!visitedNodes.has(node)){
            visitedNodes.add(node);
            steps.push([...visitedNodes]);

            let neighbours = []
            edges.forEach(edge => {
                if (edge.source.id === node){
                    neighbours.push(edge.target.id);
                }
                else if (edge.target.id === node){
                    neighbours.push(edge.source.id);
                }
            });

            neighbours.forEach(neighbour => {
                if(!visitedNodes.has(neighbour)){
                    stack.push(neighbour);
                }
            });
        }

    }
    return steps;
};