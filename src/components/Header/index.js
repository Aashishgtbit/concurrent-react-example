import React, { useState } from "react";
import "./style.scss";
export default function Header() {
  const [modeValue, setModeValue] = useState(
    window.location.pathname.includes("/normal-mode-example")
      ? "Normal Mode"
      : "Concurrent Mode"
  );
  const handleModeChange = event => {
    console.log("mode value", event.target.value);
    if (event.target.value === "concurrentMode") {
      setModeValue("Concurrent Mode");
      window.location.replace("/concurrent-mode-example");
    } else {
      setModeValue("Normal Mode");
      window.location.replace("/normal-mode-example");
    }
  };
  return (
    <div className="wrapper-header">
      <div>
        <input
          type="radio"
          name="mode"
          value="normalMode"
          onChange={handleModeChange}
          checked={modeValue !== "Concurrent Mode"}
        />{" "}
        Normal Mode
        <input
          type="radio"
          name="mode"
          value="concurrentMode"
          checked={modeValue === "Concurrent Mode"}
          onChange={handleModeChange}
        />{" "}
        Concurrent Mode
      </div>
      <h2> {modeValue} Example</h2>
    </div>
  );
}
