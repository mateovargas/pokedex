import React from "react";

const Jumbotron = ({ children }) => (
  <div style={{ height: 300, clear: "both", marginBottom: 50}} className="jumbotron center">
    {children}
  </div>
);

export default Jumbotron;
