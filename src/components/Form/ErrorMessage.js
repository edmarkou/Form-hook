import React from "react";
import style from "./style.module.css";
import classnames from "classnames";

const ErrorMessage = ({ children }) => (
  <span className={classnames(style.errorMessage)}>{children}</span>
);

export default ErrorMessage;
