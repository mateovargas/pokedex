import React from "react";

export const FormBtn = props => (
  <div className="form-group">
    <button {...props} style={{ float: "center", margin: "auto"}} className="btn btn-warning">
      {props.children}
    </button>
  </div>
);


