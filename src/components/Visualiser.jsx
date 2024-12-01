import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../pages/home.css';
import Graph from './Graph';
import Controls from './Controls';
import '../pages/algorithms.css';

const GraphVisualiser = ({ title, algorithm, placeholder, weighted }) => {
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
        { source: initialNodes[0], target: initialNodes[1] },
        { source: initialNodes[0], target: initialNodes[2] },
        { source: initialNodes[0], target: initialNodes[3] },
        { source: initialNodes[1], target: initialNodes[4] },
        { source: initialNodes[1], target: initialNodes[5] },
        { source: initialNodes[2], target: initialNodes[6] },
        { source: initialNodes[3], target: initialNodes[7] },
    ];

    const initialWeightedEdges = [
        { source: initialNodes[0], target: initialNodes[1], weight: 2 },
        { source: initialNodes[0], target: initialNodes[2], weight: 4 },
        { source: initialNodes[0], target: initialNodes[3], weight: 1 },
        { source: initialNodes[1], target: initialNodes[4], weight: 7 },
        { source: initialNodes[1], target: initialNodes[5], weight: 3 },
        { source: initialNodes[2], target: initialNodes[6], weight: 1 },
        { source: initialNodes[3], target: initialNodes[7], weight: 5 },
    ];

    const [edges] = useState(weighted ? initialWeightedEdges : initialEdges);
    const [highlightedNodes, setHighlightedNodes] = useState([]);
    const [nodes] = useState(initialNodes);
    const [startingNode, setStartingNode] = useState(0);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const timeoutIds = useRef([]);

    const handleStartNodeChange = (e) => {
        setStartingNode(e.target.value);
    };

    const checkNode = (nodeId) => {
        if (isNaN(nodeId)) {
            return false;
        }
        const validNodeIds = initialNodes.map(node => node.id);
        const minNodeId = Math.min(...validNodeIds);
        const maxNodeId = Math.max(...validNodeIds);

        return nodeId >= minNodeId && nodeId <= maxNodeId;
    };

    const handlePlay = () => {
        if (isPlaying || steps.length === 0 || currentStep >= steps.length) return;
        setIsPlaying(true);

        for (let i = currentStep; i < steps.length; i++) {
            const timeoutId = setTimeout(() => {
                setHighlightedNodes(steps[i].visitedNodes);
                setCurrentStep(i + 1);

                if (i === steps.length - 1) {
                    setIsPlaying(false);
                }
            }, (i - currentStep) * 1000);

            timeoutIds.current.push(timeoutId);
        }
    };

    const handlePause = () => {
        setIsPlaying(false);
        timeoutIds.current.forEach(timeoutId => clearTimeout(timeoutId));
        timeoutIds.current = [];
    };

    const handleReset = () => {
        timeoutIds.current.forEach(timeoutId => clearTimeout(timeoutId));
        timeoutIds.current = [];
        setHighlightedNodes([]);
        setCurrentStep(0);
        setIsPlaying(false);
    };

    useEffect(() => {
        const startNodeId = parseInt(startingNode, 10);
        if (checkNode(startNodeId)) {
            const generatedSteps = algorithm(nodes, edges, startNodeId);
            setSteps(generatedSteps);
            setCurrentStep(0); 
        } else {
            setSteps([]);
        }
    }, [startingNode, nodes, edges, algorithm]);

    return (
        <div>
            <nav className="alg-nav">
                <div className="return-button-div">
                    <Link to="/">
                        <button className="small-button">Return Home</button>
                    </Link>
                </div>
                <h1 className="alg-title">{title}</h1>
            </nav>

            <div className="graph-element">
                <Graph nodes={nodes} edges={edges} highlightedNodes={highlightedNodes} />
            </div>
            <div className="node-input-container">
                <p>Starting Node:</p>
                <input
                    type="text"
                    id="start-node"
                    placeholder={placeholder}
                    value={startingNode}
                    onChange={handleStartNodeChange}
                />
            </div>

            <Controls onPlay={handlePlay} onPause={handlePause} onReset={handleReset} />
        </div>
    );
};

GraphVisualiser.propTypes = {
    title: PropTypes.string.isRequired,
    algorithm: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    weighted: PropTypes.bool,
};

GraphVisualiser.defaultProps = {
    placeholder: '0',
    weighted: false,
};

export default GraphVisualiser;
