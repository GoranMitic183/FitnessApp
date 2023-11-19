import React from 'react'
import { useStopwatch } from 'react-timer-hook';

const Stopwatch = () => {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: false });

  return (
    <div style={{textAlign: 'center', color: 'white'}}>
      <h1>Stopwatch</h1>
      <p>Keep track your workout time!</p>
      <div style={{fontSize: '100px'}}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button className='btn btn-secondary' style={{marginRight: "0.5rem"}} onClick={start}>Start</button>
      <button className='btn btn-secondary' style={{marginRight: "0.5rem"}} onClick={pause}>Pause</button>
      <button className='btn btn-secondary' style={{marginRight: "0.5rem"}} onClick={reset}>Reset</button>
    </div>
  )
}

export default Stopwatch