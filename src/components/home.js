import React from "react";
import "./home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  handleClick = () => this.props.onClick(1);

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
