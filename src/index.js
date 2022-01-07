import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import Task from "./components/task.js";
import reportWebVitals from "./reportWebVitals";

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Task />
        <Task />
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
