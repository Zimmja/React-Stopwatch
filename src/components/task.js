import React from "react";
import "./task.css";
import Stopwatch from "./stopwatch.js";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
    };
  }

  handleSWClick = () => this.props.onSelectClick(this.props.index);

  handleDClick = () => this.props.onDeleteClick(this.props.index);

  handleRClick = () => this.props.onResetClick(this.props.index);

  activeState = () => (this.props.active ? "taskActive" : "taskInactive");

  updateDescription = (event) =>
    this.setState({ description: event.target.value });

  render() {
    return (
      <div className="taskBase">
        <div className={this.activeState()}>
          <input
            className="description"
            type="text"
            value={this.state.description}
            onChange={this.updateDescription}
          />
          <button className="stopwatch" onClick={() => this.handleSWClick()}>
            <Stopwatch
              key={`stopwatch${this.props.index}`}
              timer={this.props.timer}
            />
          </button>
          <button className="reset" onClick={() => this.handleRClick()}>
            R
          </button>
          <button className="delete" onClick={() => this.handleDClick()}>
            X
          </button>
        </div>
      </div>
    );
  }
}

<button class="pushable">
  <span class="front">Push me</span>
</button>;
