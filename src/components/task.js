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

  handleSWClick = () => this.props.onSWClick(this.props.index);

  handleDClick = () => this.props.onDClick(this.props.index);

  activeState = () => (this.props.active ? "taskActive" : "taskInactive");

  updateDescription = (event) =>
    this.setState({ description: event.target.value });

  render() {
    return (
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
            index={this.props.index}
          />
        </button>
        <button className="delete" onClick={() => this.handleDClick()}>
          X
        </button>
      </div>
    );
  }
}
