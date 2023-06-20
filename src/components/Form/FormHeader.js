import React from "react";
import style from "./style.module.css";
import classnames from "classnames";

const FormHeader = ({ text }) => (
  <h2 className={classnames(style.formTitle)}>{text}</h2>
);

export default FormHeader;
