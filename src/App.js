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
        { description: "Task 1", value: 0, visible: true },
        { description: "Task 2", value: 0, visible: true },
        { description: "Task 3", value: 0, visible: true },
      ],
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
    tasksArr[i].visible = false;
    this.setState({ tasks: tasksArr });
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
