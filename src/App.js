import React from "react";
import "./App.css";
import Taskboard from "./components/taskboard.js";
import Setup from "./components/setup.js";
import Home from "./components/home.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskCount: 1,
      page: this.pageHome,
    };
  }

  pageHome = () => <Home onClick={() => this.loadSetup()} />;

  pageSetup = () => <Setup onClick={(i) => this.loadTaskboard(i)} />;

  pageTaskboard = () => <Taskboard taskCount={this.state.taskCount} />;

  loadSetup = () => this.setState({ page: this.pageSetup });

  loadTaskboard = (i) =>
    this.setState({ taskCount: i, page: this.pageTaskboard });

  render() {
    return <div className="display">{this.state.page()}</div>;
  }
}

export default App;
