import React from "react";
import "./App.css";
import Task from "./components/task.js";
import Stopwatch from "./components/stopwatch.js";
import appTasks from "./helpers/appTasks.js";
import iconUndo from "./media/iconUndo.png";
import iconAdd from "./media/iconAdd.png";
import iconBin from "./media/iconBin.png";

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
      taskMax: 3,
      activeLoop: null,
    };
  }

  // ---------------------------
  // STATE MANAGEMENT
  // ---------------------------
  reState = (newState) => this.setState(newState);

  arrTasks = () => this.state.tasks.slice();

  arrHidden = () => this.state.hidden.slice();

  myArrs = (i) => {
    const arrs = [this.arrTasks(), this.arrHidden()];
    return arrs[i];
  };

  // ---------------------------
  // TASK MANAGEMENT
  // ---------------------------
  unhideTask() {
    appTasks.unhideTask(this.arrHidden(), this.reState);
  }

  addTask() {
    appTasks.addTask(this.arrTasks(), this.state.taskMax, this.reState);
  }

  resetTask(i) {
    appTasks.resetTask(i, this.arrTasks(), this.reState);
  }

  hideTask(i) {
    appTasks.hideTask(i, this.arrTasks(), this.arrHidden(), this.reState);
  }

  deleteHiddenTasks() {
    appTasks.deleteHiddenTasks(this.arrTasks(), this.arrHidden(), this.reState);
  }

  tasksTotal() {
    return appTasks.tasksTotal(this.arrTasks());
  }

  selectTask(i) {
    i === this.currentTask ? this.stopTimer() : this.startNewTimer(i);
  }

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
    const tasksArr = this.arrTasks();
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
          onSelectClick={(i) => this.selectTask(i)}
          onHideClick={(i) => this.hideTask(i)}
          onResetClick={(i) => this.resetTask(i)}
        />
      );
  };

  renderTaskButtons = () => {
    return (
      <div>
        {this.renderDeleteButton()}
        <button id="addTaskButton" onClick={() => this.addTask()}>
          <img className="appIcon" src={iconAdd} alt="Add task" />
        </button>
        {this.renderUnhideButton()}
      </div>
    );
  };

  renderDeleteButton = () => {
    if (this.state.hidden.length > 0)
      return (
        <button id="unhideButton" onClick={() => this.deleteHiddenTasks()}>
          <img className="appIcon" src={iconBin} alt="Delete hidden tasks" />
        </button>
      );
  };

  renderUnhideButton = () => {
    if (this.state.hidden.length > 0)
      return (
        <button id="unhideButton" onClick={() => this.unhideTask()}>
          <img className="appIcon" src={iconUndo} alt="Unhide task" />
        </button>
      );
  };

  render() {
    return (
      <div className="taskboard">
        <div class="totalTimer">
          <Stopwatch timer={this.tasksTotal()} />
        </div>
        <div className="tasksList">{this.renderAllTasks()}</div>
        <div className="taskButtons">{this.renderTaskButtons()}</div>
      </div>
    );
  }
}

export default App;
