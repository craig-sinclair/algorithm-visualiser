import React, {useState} from 'react';
import { Link } from 'react-router-dom'

import '../pages/home.css';
import Graph from './Graph';
import Controls from './Controls';
import '../pages/algorithms.css';


const GraphVisualiser = ({title, algorithm, placeholder}) => {
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

    const [highlightedNodes, setHighlightedNodes] = useState([]);
    const [nodes] = useState(initialNodes);
    const [edges] = useState(initialEdges);

    const [startingNode, setStartingNode] = useState(0);
    
    const handleStartNodeChange = (e) => {
        setStartingNode(e.target.value);
    };

    const checkNode = (nodeId) => {
        if(isNaN(nodeId)){
            return false;
        }

        const validNodeIds = initialNodes.map(node => node.id);
        const minNodeId = Math.min(...validNodeIds);
        const maxNodeId = Math.max(...validNodeIds);

        if(nodeId < minNodeId || nodeId > maxNodeId){
            return false;
        }
        return true;
    }
    const handlePlay = () => {
        const startNodeId = parseInt(startingNode, 10);
        if(!checkNode(startNodeId)){
            return;
        }

        const steps = algorithm(nodes, edges, startNodeId);
        steps.forEach((step, index) => {
            setTimeout(() => {
                setHighlightedNodes(step);
            }, index * 1000);
        });
    };

    return(

    <div>
        <nav classname='alg-nav'>
        <Link to='/'><button>Return Home</button></Link>
        <h1 className='alg-title'>{title}</h1>
        </nav>

        <div className='graph-elemenet'>
            <Graph nodes={nodes} edges={edges} highlightedNodes={highlightedNodes} />
        </div>
        <div className='node-input-container'>
            <p>Starting Node:</p>
            <input type='text' id='start-node' placeholder={placeholder} value={startingNode} onChange={handleStartNodeChange}></input>
        </div>

        <Controls onPlay={handlePlay} onPause={() => {}} onReset={() => setHighlightedNodes([])}/>
    </div>
    )

}
export default GraphVisualiser;