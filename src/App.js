import React from "react";
import "./App.css";
import Task from "./components/task.js";
import { addTask, deleteTask, unhideTask } from "./helpers/appTasks.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.timeInterval = 1000;
    this.currentTask = -1;
    this.state = {
      tasks: [
        { description: "Break", value: 0, visible: true },
        { description: "Administration", value: 0, visible: true },
        { description: "Meetings", value: 0, visible: true },
      ],
      hidden: [],
      activeLoop: null,
    };
  }

  // ---------------------------
  // STATE MANAGEMENT
  // ---------------------------
  reState = (newState) => this.setState(newState);

  copyTasksArr = () => this.state.tasks.slice();

  copyHiddenArr = () => this.state.hidden.slice();

  myArrs = (i) => {
    const arrs = [this.copyTasksArr(), this.copyHiddenArr()];
    return arrs[i];
  };

  selectTask = (i) =>
    i === this.currentTask ? this.stopTimer() : this.startNewTimer(i);

  // ---------------------------
  // TIMER MANAGEMENT
  // ---------------------------
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
    const tasksArr = this.copyTasksArr();
    tasksArr[this.currentTask].value = newTime;
    this.setState({ tasks: tasksArr });
  };

  stopTimer = () => {
    this.pauseTimer();
    this.currentTask = -1;
  };

  startNewTimer = (i) => {
    this.pauseTimer();
    this.currentTask = i;
    this.startTimer();
  };

  currentTimer = (i = this.currentTask) => this.state.tasks[i].value;

  // ---------------------------
  // RENDER MANAGEMENT
  // ---------------------------
  renderAllTasks = () =>
    this.state.tasks.map((task, i) => this.renderTask(task, i));

  renderTask = (task, ind) => {
    if (task.visible)
      return (
        <Task
          key={`task${ind}`}
          timer={task.value}
          description={task.description}
          index={ind}
          active={ind === this.currentTask}
          onSWClick={(i) => this.selectTask(i)}
          onDClick={(i) =>
            deleteTask(i, this.myArrs(0), this.myArrs(1), this.reState)
          }
        />
      );
  };

  unhideButtonFormat = () =>
    this.state.hidden.length > 0 ? "unhideActive" : "unhideInactive";

  render() {
    return (
      <div className="taskboard">
        <button
          id="addTaskButton"
          onClick={() => addTask(this.myArrs(0), this.reState)}
        >
          +
        </button>
        <button
          className={this.unhideButtonFormat()}
          id="unhideButton"
          onClick={() => unhideTask(this.myArrs(1), this.reState)}
        >
          {"<"}
        </button>
        <div className="tasksList">{this.renderAllTasks()}</div>
      </div>
    );
  }
}

export default App;
