import { useState, useRef, useEffect } from 'react';
import Graph from './Graph';
import { Link } from 'react-router-dom';
import TableVisualiser from './TableVisualiser';
import { dijkstraAlgorithm } from '../utils/dijkstraAlgorithm';
import Controls from './Controls';
import '../pages/algorithms.css';

const DijkstraVisualiser = () => {
    const initialNodes = [
        { id: 0, x: 300, y: 50 },
        { id: 1, x: 150, y: 200 },
        { id: 2, x: 300, y: 200 },
        { id: 3, x: 450, y: 200 },
        { id: 4, x: 50, y: 350 },
        { id: 5, x: 250, y: 350 },
        { id: 6, x: 400, y: 350 },
        { id: 7, x: 550, y: 350 },
    ];

    const initialEdges = [
        { source: initialNodes[0], target: initialNodes[1], weight: 2 },
        { source: initialNodes[0], target: initialNodes[2], weight: 4 },
        { source: initialNodes[0], target: initialNodes[3], weight: 1 },
        { source: initialNodes[1], target: initialNodes[4], weight: 7 },
        { source: initialNodes[1], target: initialNodes[5], weight: 3 },
        { source: initialNodes[2], target: initialNodes[6], weight: 1 },
        { source: initialNodes[3], target: initialNodes[7], weight: 5 },
    ];

    const [steps, setSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [highlightedNodes, setHighlightedNodes] = useState([]);
    const [startingNode, setStartingNode] = useState(0);
    const timeoutIds = useRef([]);

    const handlePlay = () => {
        if (currentStepIndex >= steps.length) return;
        for (let i = currentStepIndex; i < steps.length; i++) {
            const timeoutId = setTimeout(() => {
                setHighlightedNodes(steps[i].visitedNodes);
                setCurrentStepIndex(i + 1);
            }, (i - currentStepIndex) * 1000);
            timeoutIds.current.push(timeoutId);
        }
    };

    const handlePause = () => {
        timeoutIds.current.forEach(clearTimeout);
        timeoutIds.current = [];
    };

    const handleReset = () => {
        timeoutIds.current.forEach(clearTimeout);
        timeoutIds.current = [];
        setHighlightedNodes([]);
        setCurrentStepIndex(0);
    };

    useEffect(() => {
        const generatedSteps = dijkstraAlgorithm(initialNodes, initialEdges, parseInt(startingNode, 10));
        setSteps(generatedSteps);
        setHighlightedNodes([]);
        setCurrentStepIndex(0);
    }, [startingNode]);

    return (
        <div>
            <nav className="alg-nav">
                <div className="return-button-div">
                    <Link to="/">
                        <button className="small-button">Return Home</button>
                    </Link>
                </div>
                <h1 className="alg-title">Dijkstra's Algorithm Visualiser</h1>
            </nav>

            <div className="node-input-container">
                <p>Starting Node:</p>
                <input
                    type="number"
                    min="0"
                    max={initialNodes.length - 1}
                    value={startingNode}
                    onChange={(e) => setStartingNode(e.target.value)}
                />
            </div>

            <div className="graph-and-table-container">
                <div className="graph-container">
                    <Graph nodes={initialNodes} edges={initialEdges} highlightedNodes={highlightedNodes} />
                </div>
                    <TableVisualiser steps={steps} currentStepIndex={currentStepIndex} />
            </div>

            <Controls onPlay={handlePlay} onPause={handlePause} onReset={handleReset} />
        </div>
    );
};

export default DijkstraVisualiser;