import GraphVisualiser from '../components/Visualiser';
import { primJarnikAlgorithm } from '../utils/primJarnikAlgorithm';
import './algorithms.css';
const PrimJarnik = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <GraphVisualiser
        title="Prim-Jarnik Algorithm Visualiser"
        algorithm={primJarnikAlgorithm}
        placeholder="0"
        weighted={true}
      />
    </div>
  );
};

export default PrimJarnik;