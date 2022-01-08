import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import Task from "./components/task.js";
import reportWebVitals from "./reportWebVitals";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.timeInterval = 1000;
    this.currentTask = -1;
    this.state = {
      times: [1000 * 67, 0],
      timer: 0,
      update: null,
    };
  }

  handleClick = () => (this.timerOn() ? this.pauseTimer() : this.startTimer());

  startTimer = () => this.setState({ update: this.updateTimeLoop() });

  pauseTimer = () => {
    clearInterval(this.state.update);
    this.setState({ update: null });
  };

  updateTimeLoop = () =>
    setInterval(() => {
      this.incTimer(this.timeInterval);
    }, this.timeInterval);

  timerOn = () => !!this.state.update;

  incTimer = (val = 0) => {
    const newTime = this.state.timer + val;
    const timesArr = this.state.times.slice();
    timesArr[this.currentTask] = newTime;
    this.setState({ timer: newTime, times: timesArr });
  };

  renderAllTasks = () =>
    this.state.times.map((task, i) => this.renderTask(task, i));

  renderTask = (time, ind) => (
    <Task
      key={`task${ind}`}
      timer={time}
      index={ind}
      onClick={(i) => this.selectTask(i)}
    />
  );

  selectTask = (i) => {
    if (i === this.currentTask) {
      this.handleClick();
    } else {
      this.pauseTimer();
      this.setState({ timer: this.state.times[i] });
      this.currentTask = i;
      this.startTimer();
    }
  };

  render() {
    return (
      <div className="taskboard">
        <ul className="tasksList">{this.renderAllTasks()}</ul>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
