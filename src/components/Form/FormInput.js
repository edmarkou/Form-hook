import React, { useMemo } from "react";
import style from "./style.module.css";
import classnames from "classnames";

const FormInput = ({ className, label, id, type = "text", ...rest }) => {
  const inputClass = useMemo(() => {
    if (type === "button" || type === "submit") {
      return style.actionButton;
    }
    return style.formInput;
  }, [type]);

  const inputLabel = useMemo(
    () =>
      label && (
        <label className={classnames(style.inputBoxLabel)} htmlFor={id}>
          {label}
        </label>
      ),
    [id, label]
  );

  return (
    <div className={classnames(style.inputContainer)}>
      {inputLabel}
      <input
        className={classnames(inputClass, className)}
        id={id}
        type={type}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
