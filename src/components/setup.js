import React from "react";
import "./setup.css";

class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }

  handleClick = (taskCount) => this.props.onClick(taskCount);

  updateCount = (event) => {
    this.setState({ count: event.target.value });
  };

  render() {
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
        <div id="setupBase">
          <button
            id="setupButton"
            onClick={() => this.handleClick(this.state.count)}
          >
            Create Taskboard
          </button>
        </div>
      </div>
    );
  }
}

export default Setup;
