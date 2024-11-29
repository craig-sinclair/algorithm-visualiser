import GraphVisualiser from '../components/Visualiser';
import { dfsAlgorithm } from '../utils/dfsAlgorithm';

const DFS = () => {
    return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <GraphVisualiser
        title="DFS Visualiser"
        algorithm={dfsAlgorithm}
        placeholder="0"
        weighted={false}
        />
        </div>
    )

}
export default DFS;