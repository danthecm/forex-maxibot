import React from "react";
import { AuthForm, Error } from "../Styled";
import InputField from "../../InputField";
import useInput from "../../../hooks/use-input";

import { AddButton } from "../../../pages/Home/components/NewBot/Styled";
import { Select } from "../../FormContorls/";

const AddPlatformForm = () => {
  const {
    value: selectedServer,
    isValid: serverIsValid,
    valueChangedHandler: serverChanged,
    hasError: serverHasError,
    inputBlurHandler: serverBlurred,
  } = useInput(
    (value) => value.trim() !== "" && value !== "DEFAULT",
    "DEFAULT"
  );
  const loginHook = useInput((value) => value.trim() !== "");
  const { value: enteredLogin, isValid: loginIsValid } = loginHook;

  const passwordHook = useInput((value) => value.trim() !== "");

  const { value: enteredPassword, isValid: passwordIsValid } = passwordHook;
  const formIsValid = serverIsValid && passwordIsValid && loginIsValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    // const user = {
    //   username: enteredUsername,
    //   password: enteredPassword,
    // };
    // setIsFetching(true);
  };

  return (
    <AuthForm onSubmit={formSubmitHandler}>
      <Select
        onBlur={serverBlurred}
        onChange={serverChanged}
        value={selectedServer}
        error={serverHasError}
      >
        <option value="DEFAULT" disabled hidden>
          --Select MT5 Server---
        </option>
        <option value="VantageInternational-Demo">
          VantageInternational-Demo
        </option>
        <option value="VantageInternational-Live">
          VantageInternational-Live
        </option>
        <option value="VantageInternational-Live2">
          VantageInternational-Live2
        </option>
        <option value="FPMarkets-Live">FPMarkets-Live2</option>
        <option value="FPMarkets-Demo">FPMarkets-Demo</option>
      </Select>
      {serverHasError ? <Error>Please select a symbol</Error> : ""}
      <InputField
        hook={loginHook}
        value={enteredLogin}
        type="number"
        placeholder="Enter MT5 Login"
        message="MT5 Login cannot be empty"
      />

      <InputField
        value={enteredPassword}
        hook={passwordHook}
        type="text"
        placeholder="Enter MT5 Password"
        message="MT5 Password cannot be empty"
      />

      <AddButton disabled={!formIsValid} type="submit">
        Add Platform
      </AddButton>
    </AuthForm>
  );
};

export default AddPlatformForm;
