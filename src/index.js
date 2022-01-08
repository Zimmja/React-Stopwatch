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
      activeLoop: null,
    };
  }

  startTimer = () => this.setState({ activeLoop: this.incTimerLoop() });

  pauseTimer = () => {
    clearInterval(this.state.activeLoop);
    this.setState({ activeLoop: null });
  };

  incTimerLoop = () =>
    setInterval(() => {
      this.incTimer(this.timeInterval);
    }, this.timeInterval);

  incTimer = (val = 0) => {
    const newTime = this.currentTimer() + val;
    const timesArr = this.state.times.slice();
    timesArr[this.currentTask] = newTime;
    this.setState({ times: timesArr });
  };

  selectTask = (i) =>
    i === this.currentTask ? this.stopTimer() : this.startNewTimer(i);

  stopTimer = () => {
    this.pauseTimer();
    this.currentTask = -1;
  };

  startNewTimer = (i) => {
    this.pauseTimer();
    this.currentTask = i;
    this.startTimer();
  };

  currentTimer = (i = this.currentTask) => this.state.times[i];

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
