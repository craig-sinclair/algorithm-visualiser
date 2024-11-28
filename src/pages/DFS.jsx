import GraphVisualiser from '../components/Visualiser';
import { dfsAlgorithm } from '../utils/dfsAlgorithm';

const DFS = () => {
    return(
        <GraphVisualiser
        title="DFS Visualiser"
        algorithm={dfsAlgorithm}
        placeholder="0"
        weighted={false}
        />
    )

}
export default DFS;