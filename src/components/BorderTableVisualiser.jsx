import PropTypes from 'prop-types';
import '../pages/algorithms.css';

const BorderTableVisualiser = ({ border, currentIndex }) => {
    return (
        <div className="border-table-visualizer">
            <h3>Border Table</h3>
            <div className="border-table">
                {border.map((value, index) => (
                    <div
                        key={index}
                        className={`border-cell ${index === currentIndex ? 'active' : ''}`}
                    >
                        <span>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

BorderTableVisualiser.propTypes = {
    border: PropTypes.arrayOf(PropTypes.number).isRequired,
    currentIndex: PropTypes.number,
};

BorderTableVisualiser.defaultProps = {
    currentIndex: -1,
};

export default BorderTableVisualiser;
