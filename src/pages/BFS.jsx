import GraphVisualiser from '../components/Visualiser';
import { bfsAlgorithm } from '../utils/bfsAlgorithm';

const BFS = () => {
    return(
        <GraphVisualiser
        title="BFS Visualiser"
        algorithm={bfsAlgorithm}
        placeholder="0"
        weighted={false}
        />
    )
}
export default BFS;