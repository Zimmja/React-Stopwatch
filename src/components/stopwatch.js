import React from "react";
import "./stopwatch.css";

export default class Stopwatch extends React.Component {
  days = () => this.fTime(parseInt(this.props.timer / 86400000));
  hours = () => this.fTime(parseInt(this.props.timer / 3600000) % 24);
  minutes = () => this.fTime(parseInt(this.props.timer / 60000) % 60);
  seconds = () => this.fTime(parseInt(this.props.timer / 1000) % 60);
  fTime = (time) => (time < 10 ? `0${time}` : `${time}`);

  activeState = (secs) =>
    this.props.timer >= secs ? "timeActive" : "timeInactive";

  render() {
    return (
      <div>
        <span className={this.activeState(86400000)}>{`${this.days()}:`}</span>
        <span className={this.activeState(3600000)}>{`${this.hours()}:`}</span>
        <span className={this.activeState(60000)}>{`${this.minutes()}:`}</span>
        <span className="timeActive">{`${this.seconds()}`}</span>
      </div>
    );
  }
}
