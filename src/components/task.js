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
  // handleChange = (event) => this.setState({ description: event.target.value });

  activeState = () => (this.props.active ? "taskActive" : "taskInactive");

  render() {
    return (
      <div className={this.activeState()}>
        <button className="description">{this.props.description}</button>
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
