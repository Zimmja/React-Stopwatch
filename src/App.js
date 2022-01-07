import React from "react";
import "./App.css";

function App() {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);

  let appTime = 0;
  let appTimerOn = false;

  // This function is called whenever the timerOn state variable changes
  React.useEffect(() => {
    let interval = null;
    let timeInterval = 10;

    if (timerOn) {
      // When timer is turned on
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + timeInterval);
      }, timeInterval);
    } else {
      // When timer is turned off
      clearInterval(interval);
    }

    // Not necessary, but just makes extra sure this doesn't keep running when the user leaves the page
    return () => clearInterval(interval);
  }, [timerOn]);

  const formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);

  return (
    <div className="App">
      <div>
        <p>Hours: {formatTime(parseInt(time / 3600000) % 24)}</p>
        <p>Minutes: {formatTime(parseInt(time / 60000) % 60)}</p>
        <p>Seconds: {formatTime(parseInt(time / 1000) % 60)}</p>
      </div>
      <div>
        {!timerOn && time === 0 && (
          <button onClick={() => setTimerOn(true)}>Start</button>
        )}
        {!timerOn && time !== 0 && (
          <button onClick={() => setTimerOn(true)}>Resume</button>
        )}
        {timerOn && <button onClick={() => setTimerOn(false)}>Pause</button>}
        {!timerOn && time !== 0 && (
          <button onClick={() => setTime(0)}>Reset</button>
        )}
      </div>
    </div>
  );
}

export default App;
