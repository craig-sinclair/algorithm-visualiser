import '../pages/algorithms.css'

const Controls = ({ onPlay, onPause, onReset }) => (
    <div className='control-buttons-container'>
        <button onClick={onPlay} className='control-buttons'>Play</button>
        <button onClick={onPause} className='control-buttons'>Pause</button>
        <button onClick={onReset} className='control-buttons'>Reset</button>
    </div>
);

export default Controls;