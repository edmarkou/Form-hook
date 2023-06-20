import React from "react";
import style from "./style.module.css";

const Form = ({ onSubmit, children }) => (
  <form className={style.form} onSubmit={onSubmit}>
    <fieldset className={style.formFieldset}>{children}</fieldset>
  </form>
);

export default Form;
