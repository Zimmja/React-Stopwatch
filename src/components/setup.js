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
      <div className="homepage">
        <input
          className="description"
          type="text"
          value={this.state.count}
          onChange={this.updateCount}
        />
        <div id="startBase">
          <button
            id="startButton"
            onClick={() => this.handleClick(this.state.count)}
          >
            Start with {this.state.count}
          </button>
        </div>
      </div>
    );
  }
}

export default Setup;
