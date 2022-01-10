import React from "react";
import "./setup.css";

class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 3,
    };
  }

  // this.props.onClick() calls the function passed in from the Apps.js class, i.e. loadTaskboard()
  // with taskCount passed back to App.js as a property through the loadTaskboard() function
  handleClick = (taskCount) => this.props.onClick(taskCount);

  updateCount = (event) => {
    this.setState({ count: event.target.value });
  };

  render() {
    console.log("Setup page loaded");
    return (
      <div className="setupPage">
        <span className="setupText">Tasks to start: </span>
        <input
          className="setupInput"
          type="number"
          min="1"
          max="9"
          value={this.state.count}
          onChange={this.updateCount}
        />
        <div id="sBase">
          <button id="sButt" onClick={() => this.handleClick(this.state.count)}>
            Create Taskboard
          </button>
        </div>
      </div>
    );
  }
}

export default Setup;
