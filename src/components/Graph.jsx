import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const Graph = ({ nodes, edges, highlightedNodes }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Draw edges
    svg.selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke", "white");

    // Add edge weights as text labels
    svg.selectAll('text.weight')
      .data(edges)
      .enter()
      .append('text')
      .attr('class', 'weight')
      .attr('x', d => (d.source.x + d.target.x) / 2)
      .attr('y', d => (d.source.y + d.target.y) / 2)
      .text(d => d.weight)
      .attr('fill', 'black');

    // Draw nodes
    svg.selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 27)
      .attr("fill", d => highlightedNodes.includes(d.id) ? "orange" : "steelblue");

    // Add node labels as text
    svg.selectAll("text.node")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "node")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text(d => d.id);

  }, [nodes, edges, highlightedNodes]);

  return <svg ref={svgRef} width="600" height="400"></svg>;
};

export default Graph;

Graph.propTypes = {
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        })
    ).isRequired,
    edges: PropTypes.arrayOf(
        PropTypes.shape({
            source: PropTypes.shape({
                id: PropTypes.number.isRequired,
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            }),
            target: PropTypes.shape({
                id: PropTypes.number.isRequired,
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            }),
            weight: PropTypes.number // Add weight validation for weighted edges
        })
    ).isRequired,
    highlightedNodes: PropTypes.arrayOf(PropTypes.number).isRequired
};
