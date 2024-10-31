import React from 'react'
import '../pages/algorithms.css'

const Controls = ({ onPlay, onPause, onReset }) => (
    <div className='control-buttons-container'>
        <button onClick={onPlay}>Play</button>
        <button onClick={onPause}>Pause</button>
        <button onClick={onReset}>Reset</button>
    </div>
);

export default Controls;