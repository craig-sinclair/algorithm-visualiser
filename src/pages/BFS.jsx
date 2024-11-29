import GraphVisualiser from '../components/Visualiser';
import { bfsAlgorithm } from '../utils/bfsAlgorithm';

const BFS = () => {
    return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraphVisualiser
            title="BFS Visualiser"
            algorithm={bfsAlgorithm}
            placeholder="0"
            weighted={false}
            />
        </div>

    )
}
export default BFS;