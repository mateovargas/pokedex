import React from "react";
import './Jumbotron.css';

const Jumbotron = ({ children }) => (
  <div style={{ height: 300, clear: "both", marginBottom: 50}} className="jumbotron center">
    {children}
  </div>
);

export default Jumbotron;
