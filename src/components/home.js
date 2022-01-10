import React from "react";
import "./home.css";

class Home extends React.Component {
  handleClick = () => this.props.onClick();

  render() {
    return (
      <div className="homepage">
        <div id="startBase">
          <button id="startButton" onClick={() => this.handleClick()}>
            GET STARTED
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
