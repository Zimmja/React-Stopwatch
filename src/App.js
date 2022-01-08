import React from "react";
import "./App.css";
import Task from "./components/task.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.timeInterval = 1000;
    this.currentTask = -1;
    this.state = {
      tasks: ["Task 1", "Task 2", "Task 3"],
      times: [1000 * 67, 1000 * 1028, 1000 * 54302],
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
    const timesArr = this.copyTimesArr();
    timesArr[this.currentTask] = newTime;
    this.setState({ times: timesArr });
  };

  copyTimesArr = () => this.state.times.slice();

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
      active={ind == this.currentTask}
      onSWClick={(i) => this.selectTask(i)}
      onDClick={(i) => this.deleteTask(i)}
    />
  );

  addTask = () => {
    const timesArr = this.copyTimesArr();
    timesArr.push(0);
    this.setState({ times: timesArr });
  };

  deleteTask = (i) => {
    const timesArr = this.copyTimesArr();
    timesArr.splice(i, 1);
    this.setState({ times: timesArr });
    if (i <= this.currentTask) this.currentTask -= 1;
  };

  render() {
    return (
      <div className="taskboard">
        <button id="addTaskButton" onClick={() => this.addTask()}>
          +
        </button>
        <div className="tasksList">{this.renderAllTasks()}</div>
      </div>
    );
  }
}

export default App;
