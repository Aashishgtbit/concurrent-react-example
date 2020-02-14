import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import AppBootUp from "./containers/AppBootUp";
import "./assets/styles/bootstrap/bootstrap.scss";
import App from "./App";

const normalMode = window.location.pathname.includes("/normal-mode-example");
if (normalMode) {
  ReactDOM.render(<App />, document.getElementById("root"));
} else {
  const rootElement = document.getElementById("root");
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
