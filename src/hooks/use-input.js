import { useState } from "react";

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");

  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateInput(enteredValue);

  const hasError = !valueIsValid && isTouched

  const valueChangedHandler = (e) => {
    setEnteredValue(() => e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(() => true);
  };

//   const InputField = ;

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    inputBlurHandler,
    valueChangedHandler
  }
};


export default useInput;
