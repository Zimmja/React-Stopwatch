import React from "react";
import Home from "./components/home.js";
import Setup from "./components/setup.js";
import Taskboard from "./components/taskboard.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskCount: 1,
      page: this.pageHome,
    };
  }

  // These functions render different pages of the app with parameters
  pageHome = () => {
    console.log("Home page loading...");
    return <Home onClick={() => this.loadSetup()} />;
  };

  pageSetup = () => {
    console.log("Setup page loading...");
    return <Setup onClick={(i) => this.loadTaskboard(i)} />;
  };

  pageTaskboard = () => {
    console.log(`Taskboard page loading with ${this.state.taskCount} tasks...`);
    return <Taskboard taskCount={this.state.taskCount} />;
  };

  // These functions change which page of the app should be rendered
  loadSetup = () => {
    console.log("Switching to the Setup page");
    this.setState({ page: this.pageSetup });
  };

  loadTaskboard = (i) => {
    console.log(`Switching to the Taskboard page with ${i} tasks`);
    this.setState({ page: this.pageTaskboard, taskCount: i });
  };

  // This function provides the HTML for rendering the page
  render() {
    return <div>{this.state.page()}</div>;
  }
}

export default App;
