import PropTypes from 'prop-types';

const TableVisualiser = ({ steps, currentStepIndex }) => {
    return (
        <div className="table-container">
            <h2>Algorithm Progress</h2>
            <table>
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Visited Nodes</th>
                        <th>Distances</th>
                    </tr>
                </thead>
                <tbody>
                    {steps.slice(0, currentStepIndex + 1).map((step, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{step.visitedNodes.join(', ')}</td>
                            <td>
                                {Object.entries(step.distances)
                                    .sort(([a], [b]) => a - b)
                                    .map(([key, value], idx, arr) => (
                                        <span key={key}>
                                            {key}: {value === Infinity ? '∞' : value}
                                            {idx < arr.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TableVisualiser.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            visitedNodes: PropTypes.arrayOf(PropTypes.number).isRequired,
            distances: PropTypes.object.isRequired,
        })
    ).isRequired,
    currentStepIndex: PropTypes.number.isRequired,
};

export default TableVisualiser;