import React from "react";

export const FormBtn = props => (
  <div className="form-group">
    <button {...props} style={{ float: "center", margin: "auto"}} className="btn btn-success">
      {props.children}
    </button>
  </div>
);


