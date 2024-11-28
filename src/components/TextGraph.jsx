import PropTypes from 'prop-types';
import '../pages/algorithms.css';

const TextGraph = ({ steps }) => {
    return (
        <div className="text-graph-container">
            {steps.map((step, index) => (
                <div key={index} className="text-graph-step">
                    <h4>Step {index + 1}</h4>
                    <p>{step.description}</p>
                    {step.data && (
                        <div className="step-data">
                            {Object.entries(step.data).map(([key, value]) => (
                                <p key={key}>
                                    <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

TextGraph.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string.isRequired,
            data: PropTypes.object,
        })
    ).isRequired,
};

export default TextGraph;
