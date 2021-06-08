import React from "react";
import "./List.css";

export const ModalList = ({ children }) => {
  return (
    <div className="list-overflow-container-modal">
      <ul className="list-group">
        {children}
      </ul>
    </div>
  );
};