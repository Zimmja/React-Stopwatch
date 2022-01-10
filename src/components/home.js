import React from "react";
import "./home.css";

class Home extends React.Component {
  // this.props.onClick() calls the function passed in from the Apps.js class, i.e. loadSetup()
  handleClick = () => this.props.onClick();

  render() {
    console.log("Home page loaded");
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
