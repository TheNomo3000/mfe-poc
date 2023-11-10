import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    const reactVersion = require("../package.json").dependencies["react"];

    return [
      <div class="card">
        <div class="card-content">
          <div class="content">
            <h1>Micro Frontend React</h1>
            <p>React Version: {reactVersion}</p>
          </div>
        </div>
      </div>,
    ];
  }
}

class ChildReactElement extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App />, this);
  }
}

customElements.define("child-react-element", ChildReactElement);
