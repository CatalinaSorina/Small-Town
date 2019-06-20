import React from "react";
import { NavLink } from "react-router-dom";

import "./ErrorMessage.css";

const ErrorMessage = props => {
  return (
    <div className="error">
      <NavLink to="/">←</NavLink>
      <label>{props.message}</label>
    </div>
  );
};

export default ErrorMessage;
