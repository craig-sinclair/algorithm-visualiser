import { Link } from 'react-router-dom';
import {useState} from 'react';
import PropTypes from 'prop-types';
import BorderTableVisualiser from './BorderTableVisualiser';
import '../pages/algorithms.css';

const TextVisualiser = ({ title, algorithm, placeholder }) => {
    const [input, setInput] = useState('bacbabababacaab|ababaca');
    const [steps, setSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handlePlay = () => {
        if (!input.includes('|')) {
            setErrorMessage('Input must be in the format text|pattern.');
            return;
        }

        const visualizationSteps = algorithm(input);
        setSteps(visualizationSteps);
        setCurrentStepIndex(0);
        setErrorMessage('');
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const renderVisualization = () => {
        if (steps.length === 0) {
            return <p>Enter input and press play to start visualization.</p>;
        }

        const { textIndex, patternIndex, border, currentPatternIndex } =
            steps[currentStepIndex].data || {};
        const text = input.split('|')[0];
        const pattern = input.split('|')[1];

        return (
            <div className="visualization-wrapper">
                <div className="text-match-visualizer">
                    <div className="text-container">
                        <h3>Text</h3>
                        <div className="text-boxes">
                            {text.split('').map((char, index) => (
                                <div
                                    key={index}
                                    className={`char-box ${index === textIndex ? 'active' : ''}`}
                                >
                                    {char}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="arrow-container">
                        <div className="arrow">
                            {Array.from({ length: text.length }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`pointer ${index === textIndex ? 'active-pointer' : ''}`}
                                >
                                    ↑
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pattern-container">
                        <h3>Pattern</h3>
                        <div className="pattern-boxes">
                            {pattern.split('').map((char, index) => (
                                <div
                                    key={index}
                                    className={`char-box ${index === patternIndex ? 'active' : ''}`}
                                >
                                    {char}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {border && (
                    <BorderTableVisualiser border={border} currentIndex={currentPatternIndex} />
                )}
            </div>
        );
    };

    return (
        <div>
            <nav className="alg-nav">
                <div className="return-button-div">
                    <Link to="/"><button>Back</button></Link>
                </div>
                <h1 className="alg-title">{title}</h1>
            </nav>

            <div className="play-reset-container">
                
            </div>

            <div className="node-input-container">
                <p>Enter Input:</p>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={input}
                    onChange={handleInputChange}
                />

                <button onClick={handlePlay} className="small-button">Play</button>
                <div className='line-break'>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>

            </div>

            <div className="visualization-container">{renderVisualization()}</div>

            {steps.length > 0 && (
                <div className="description-container">
                    <p>{steps[currentStepIndex].description}</p>
                </div>
            )}

            <div className="step-navigation-container">
                <button onClick={handlePrevious} disabled={currentStepIndex === 0}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={currentStepIndex === steps.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

TextVisualiser.propTypes = {
    title: PropTypes.string.isRequired,
    algorithm: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

TextVisualiser.defaultProps = {
    placeholder: 'Enter text|pattern',
};

export default TextVisualiser;
