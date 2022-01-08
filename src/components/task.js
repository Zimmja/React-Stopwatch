import React from "react";
import "./task.css";
import Stopwatch from "./stopwatch.js";

export default class Task extends React.Component {
  handleClick = () => this.props.onClick(this.props.index);

  hours = () => this.fTime(parseInt(this.props.timer / 3600000) % 24);
  minutes = () => this.fTime(parseInt(this.props.timer / 60000) % 60);
  seconds = () => this.fTime(parseInt(this.props.timer / 1000) % 60);
  fTime = (time) => (time < 10 ? `0${time}` : `${time}`);

  render() {
    return (
      <div className="task">
        <button className="stopwatch" onClick={() => this.handleClick()}>
          <Stopwatch
            key={`stopwatch${this.props.index}`}
            timer={this.props.timer}
            index={this.props.index}
            onClick={(i) => this.selectTask(i)}
          />
        </button>
      </div>
    );
  }
}
