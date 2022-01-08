import React from "react";
import "./task.css";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => this.props.onClick(this.props.index);

  hours = () => this.fTime(parseInt(this.props.timer / 3600000) % 24);
  minutes = () => this.fTime(parseInt(this.props.timer / 60000) % 60);
  seconds = () => this.fTime(parseInt(this.props.timer / 1000) % 60);
  fTime = (time) => (time < 10 ? `0${time}` : `${time}`);

  render() {
    return (
      <div className="task">
        <button
          className="stopwatch"
          onClick={() => this.handleClick()}
        >{`${this.hours()}:${this.minutes()}:${this.seconds()}`}</button>
      </div>
    );
  }
}
