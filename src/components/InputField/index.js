import React from "react";
import styles from "../../pages/Auth/Auth.module.css";

const InputField = ({ name, type, hook, message, placeholder, autoComplete }) => {
  const { inputBlurHandler, valueChangedHandler, hasError } = hook;
  return (
    <>
      <input
        className={hasError ? styles.invalid : ""}
        placeholder={placeholder}
        type={type}
        name={name}
        aria-invalid={hasError}
        aria-describedby={message}
        onChange={valueChangedHandler}
        onBlur={inputBlurHandler}
        autoComplete={autoComplete}
      />
      {hasError ? <p className={styles.error}>{message}</p> : ""}
    </>
  );
};

export default InputField;
