import React from "react";
import { Input, InputError } from "../FormContorls";

const InputField = ({
  type,
  hook,
  message,
  placeholder,
  autoComplete,
  pattern,
  ...otherOptions
}) => {
  const inputBlurHandler = hook?.inputBlurHandler;
  const valueChangedHandler = hook?.valueChangedHandler;
  const hasError = hook?.hasError;

  return (
    <>
      <Input
        className={hasError ? "invalid" : ""}
        placeholder={placeholder}
        type={type}
        aria-invalid={hasError}
        aria-describedby={message}
        onChange={valueChangedHandler}
        onBlur={inputBlurHandler}
        autoComplete={autoComplete}
        pattern={pattern}
        {...otherOptions}
      />
      {hasError ? <InputError>{message}</InputError> : ""}
    </>
  );
};

export default InputField;
