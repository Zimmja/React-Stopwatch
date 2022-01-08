import React from "react";
import "./task.css";
import Stopwatch from "./stopwatch.js";

export default class Task extends React.Component {
  handleSWClick = () => this.props.onSWClick(this.props.index);
  handleDClick = () => this.props.onDClick(this.props.index);

  render() {
    return (
      <div className="task">
        <button className="stopwatch" onClick={() => this.handleSWClick()}>
          <Stopwatch
            key={`stopwatch${this.props.index}`}
            timer={this.props.timer}
            index={this.props.index}
          />
        </button>
        <button className="deleteButton" onClick={() => this.handleDClick()}>
          Delete
        </button>
      </div>
    );
  }
}
