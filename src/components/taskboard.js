import React from "react";
import "./taskboard.css";
import Task from "./task.js";
import Stopwatch from "./stopwatch.js";
import appTasks from "../helpers/appTasks.js";
import appTimer from "../helpers/appTimer.js";
import iconUndo from "../media/iconUndo.png";
import iconAdd from "../media/iconAdd.png";
import iconBin from "../media/iconBin.png";

class Taskboard extends React.Component {
  constructor(props) {
    super(props);
    this.timeInterval = 1000;
    this.currentTask = -1;
    this.state = {
      tasks: this.setupTasks(),
      hidden: [],
      taskMax: this.setupTasksCount(),
      activeLoop: null,
    };
  }

  setupTasksCount = () => this.props.taskCount;

  setupTasks = () => {
    const taskCount = this.props.taskCount;
    const tasks = [];
    for (let i = 0; i < taskCount; i++) {
      tasks.push({ description: `Task ${i + 1}`, value: 0, visible: true });
    }
    return tasks;
  };

  // ---------------------------
  // STATE MANAGEMENT
  // ---------------------------
  reState = (newState) => this.setState(newState);

  setCurrent = (i) => (this.currentTask = i);

  arrTasks = () => this.state.tasks.slice();

  arrHidden = () => this.state.hidden.slice();

  // ---------------------------
  // TASK MANAGEMENT
  // ---------------------------
  addTask = () => {
    console.log("Adding...");
    appTasks.addTask(this.arrTasks(), this.state.taskMax, this.reState);
  };

  hideTask = (i) => {
    if (this.currentTask === i)
      appTasks.stopTasks(this.pauseTimer, this.setCurrent);
    appTasks.hideTask(i, this.arrTasks(), this.arrHidden(), this.reState);
  };

  deleteHiddenTasks = () => {
    appTasks.deleteHiddenTasks(
      this.arrTasks(),
      this.arrHidden(),
      this.reState,
      [this.currentTask, this.setCurrent]
    );
  };

  resetTask = (i) => appTasks.resetTask(i, this.arrTasks(), this.reState);

  unhideTask = () => appTasks.unhideTask(this.arrHidden(), this.reState);

  tasksTotal = () => appTasks.tasksTotal(this.arrTasks());

  selectTask = (i) =>
    i === this.currentTask ? this.stopTimer() : this.restartTimer(i);

  updateTaskDescription = (i, description) => {
    const tasksArr = this.arrTasks();
    tasksArr[i].description = description;
    this.reState({ tasks: tasksArr });
  };

  // ---------------------------
  // TIMER MANAGEMENT
  // ---------------------------
  startTimer = () => this.setState({ activeLoop: this.incTimerLoop() });

  pauseTimer = () => appTimer.pauseTimer(this.state.activeLoop, this.reState);

  incTimerLoop = () => appTimer.incTimerLoop(this.incTimer, this.timeInterval);

  incTimer = (val = 0) =>
    appTimer.incTimer(val, this.arrTasks(), this.currentTask, this.reState);

  stopTimer = () => appTimer.stopTimer(this.pauseTimer, this.setCurrent);

  restartTimer = (i) =>
    appTimer.restartTimer(i, this.pauseTimer, this.setCurrent, this.startTimer);

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
          onUpdateDescription={(i, description) =>
            this.updateTaskDescription(i, description)
          }
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
    console.log(
      "Render with " + this.state.tasks.map((task) => task.description)
    );
    return (
      <div className="taskboard">
        <div className="totalTimer">
          <Stopwatch timer={this.tasksTotal()} />
        </div>
        <div className="tasksList">{this.renderAllTasks()}</div>
        <div className="taskButtons">{this.renderTaskButtons()}</div>
      </div>
    );
  }
}

export default Taskboard;
