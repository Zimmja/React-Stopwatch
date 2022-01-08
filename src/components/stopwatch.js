import React from "react";
import "./stopwatch.css";

export default class Stopwatch extends React.Component {
  hours = () => this.fTime(parseInt(this.props.timer / 3600000) % 24);
  minutes = () => this.fTime(parseInt(this.props.timer / 60000) % 60);
  seconds = () => this.fTime(parseInt(this.props.timer / 1000) % 60);
  fTime = (time) => (time < 10 ? `0${time}` : `${time}`);

  render() {
    return (
      <div className="hoursminssecs">
        {`${this.hours()}:${this.minutes()}:${this.seconds()}`}
      </div>
    );
  }
}
