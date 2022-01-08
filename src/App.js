import React from "react";
import "./App.css";
import Task from "./components/task.js";

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

  copyTasksArr = () => this.state.tasks.slice();

  copyHiddenArr = () => this.state.hidden.slice();

  currentTimer = (i = this.currentTask) => this.state.tasks[i].value;

  renderAllTasks = () =>
    this.state.tasks.map((task, i) => this.renderTask(task, i));

  addTask = () => {
    const tasksArr = this.copyTasksArr();
    tasksArr.push({
      description: `Task ${tasksArr.length + 1}`,
      value: 0,
      visible: true,
    });
    this.setState({ tasks: tasksArr });
  };

  deleteTask = (i) => {
    const tasksArr = this.copyTasksArr();
    const hiddenArr = this.copyHiddenArr();
    tasksArr[i].visible = false;
    hiddenArr.push(tasksArr[i]);
    this.setState({ tasks: tasksArr, hidden: hiddenArr });
  };

  unhideTask = () => {
    const hiddenArr = this.copyHiddenArr();
    const unhidden = hiddenArr.pop();
    unhidden.visible = true;
    this.setState({ hidden: hiddenArr });
  };

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
          onDClick={(i) => this.deleteTask(i)}
          onEdit={(i) => this.shout(i)}
        />
      );
  };

  unhideButtonFormat = () =>
    this.state.hidden.length > 0 ? "unhideActive" : "unhideInactive";

  render() {
    return (
      <div className="taskboard">
        <button id="addTaskButton" onClick={() => this.addTask()}>
          +
        </button>
        <button
          class={this.unhideButtonFormat()}
          id="unhideButton"
          onClick={() => this.unhideTask()}
        >
          {"<"}
        </button>
        <div className="tasksList">{this.renderAllTasks()}</div>
      </div>
    );
  }
}

export default App;
