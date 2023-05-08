import React, { useState } from "react";
import { AuthForm, Error } from "../Styled";
import InputField from "../../InputField";
import useInput from "../../../hooks/use-input";
import useAuth from "../../../hooks/use-auth";
import useAxiosPrivate from "../../../hooks/use-axios-private";

import { AddButton } from "../../../pages/Home/components/NewBot/Styled";
import { Select } from "../../FormContorls/";
import { newProfileReq } from "../../../services/trade-profile";
import { useNavigate } from "react-router-dom";

const AddPlatformForm = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(false);
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
    const tradeProfile = {
      mt5_login: enteredLogin,
      mt5_password: enteredPassword,
      mt5_server: selectedServer,
      user: auth?.user?.id,
    };
    setIsLoading(true);
    console.log("The trade platoform is: ", tradeProfile);

    const sendProfileRequest = async () => {
      try {
        await newProfileReq(axiosPrivate, tradeProfile);
        setIsLoading(false);
        navigate("/");
      } catch (error) {
        setIsLoading(false);
        console.log("There was an error ", error);
      }
    };

    sendProfileRequest();
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

        <option value="AdmiralMarkets-Live">AdmiralMarkets-Live2</option>
        <option value="AdmiralMarkets-Demo">AdmiralMarkets-Demo</option>
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
        {isLoading ? "Please wait..." : "Add Profile"}
      </AddButton>
    </AuthForm>
  );
};

export default AddPlatformForm;
