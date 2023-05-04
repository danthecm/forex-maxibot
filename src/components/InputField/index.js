import React from "react";
import { Error } from "../Auth/Styled";

const InputField = ({
  name,
  type,
  hook,
  message,
  placeholder,
  autoComplete,
}) => {
  const { inputBlurHandler, valueChangedHandler, hasError } = hook;
  return (
    <>
      <input
        className={hasError ? "invalid" : ""}
        placeholder={placeholder}
        type={type}
        name={name}
        aria-invalid={hasError}
        aria-describedby={message}
        onChange={valueChangedHandler}
        onBlur={inputBlurHandler}
        autoComplete={autoComplete}
      />
      {hasError ? <Error>{message}</Error> : ""}
    </>
  );
};

export default InputField;
