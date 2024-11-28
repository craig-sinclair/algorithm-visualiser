import TextVisualiser from '../components/TextVisualiser';
import { kmpAlgorithm } from '../utils/kmpAlgorithm';

const KMP = () => {
    return (
        <TextVisualiser
            title="KMP String Search Visualiser"
            algorithm={kmpAlgorithm}
            placeholder="Enter text|pattern"
        />
    );
};

export default KMP;
