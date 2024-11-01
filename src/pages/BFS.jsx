import React from 'react';
import GraphVisualiser from '../components/Visualiser';
import { bfsAlgorithm } from '../utils/bfsAlgorithm';

const BFS = () => {
    return(
        <GraphVisualiser
        title="BFS Visualiser"
        algorithm={bfsAlgorithm}
        placeholder="0"
        />
    )
}
export default BFS;