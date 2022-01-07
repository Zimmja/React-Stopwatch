import React from "react";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.timeInterval = 1000;
    this.timerOn = false;
    this.state = {
      timer: 0,
      update: null,
    };
  }

  startTimer = () => this.setState({ update: this.registerForUpdate() });

  pauseTimer = () => clearInterval(this.state.update);

  registerForUpdate = () =>
    setInterval(() => {
      this.setState({ timer: this.timer(this.timeInterval) });
    }, this.timeInterval);

  timer = (val = 0) => this.state.timer + val;

  fTime = (time) => (time < 10 ? `0${time}` : `${time}`);

  render() {
    return (
      <div className="App">
        <div>
          <p>Hours: {this.fTime(parseInt(this.timer() / 3600000) % 24)}</p>
          <p>Minutes: {this.fTime(parseInt(this.timer() / 60000) % 60)}</p>
          <p>Seconds: {this.fTime(parseInt(this.timer() / 1000) % 60)}</p>
        </div>
        <button onClick={() => this.startTimer()}>Go</button>
        <button onClick={() => this.pauseTimer()}>Stop</button>
      </div>
    );
  }
}
