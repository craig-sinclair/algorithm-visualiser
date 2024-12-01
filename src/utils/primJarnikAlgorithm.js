export const primJarnikAlgorithm = (nodes, edges, startingNodeId) => {
  const steps = [];
  const treeVertices = new Set();
  const nonTreeVertices = new Set(nodes.map(node => node.id));
  const treeEdges = [];

  treeVertices.add(startingNodeId);
  nonTreeVertices.delete(startingNodeId);

  steps.push({
    visitedNodes: Array.from(treeVertices),
  });

  while (nonTreeVertices.size > 0) {
    let minEdge = null;

    for (const edge of edges) {
      const source = edge.source.id;
      const target = edge.target.id;

      const isConnectingEdge =
        (treeVertices.has(source) && nonTreeVertices.has(target)) ||
        (treeVertices.has(target) && nonTreeVertices.has(source));

      if (isConnectingEdge) {
        if (minEdge === null || edge.weight < minEdge.weight) {
          minEdge = edge;
        }
      }
    }

    if (minEdge === null) break;

    const source = minEdge.source.id;
    const target = minEdge.target.id;

    treeVertices.add(source);
    treeVertices.add(target);
    nonTreeVertices.delete(source);
    nonTreeVertices.delete(target);

    steps.push({
      visitedNodes: Array.from(treeVertices),
      edges: [...treeEdges, minEdge],
    });

    treeEdges.push(minEdge);
  }

  return steps;
};