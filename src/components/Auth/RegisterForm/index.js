import { useState } from "react";
import useInput from "../../../hooks/use-input";
import { Link, useNavigate } from "react-router-dom";
import { AuthForm, Error } from "../Styled";
import { registerReq } from "../../../services/auth";

export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,34}$/;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);

  const {
    value: enteredUsername,
    inputBlurHandler: usernameBlurHandler,
    valueChangedHandler: usernameChangedHandler,
    isValid: usernameIsValid,
    hasError: usernameHasError,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    inputBlurHandler: emailBlurHandler,
    valueChangedHandler: emailChangedHandler,
    isValid: emailIsValid,
    hasError: emailHasError,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    inputBlurHandler: passwordBlurHandler,
    valueChangedHandler: passwordChangedHandler,
    isValid: passwordIsValid,
    hasError: passwordHasError,
  } = useInput((value) => PWD_REGEX.test(value));

  const {
    value: enteredCPassword,
    inputBlurHandler: cPasswordBlurHandler,
    valueChangedHandler: cPasswordChangedHandler,
    isValid: cPasswordIsValid,
    hasError: cPasswordHasError,
  } = useInput((value) => passwordIsValid && value === enteredPassword);

  const formIsValid =
    usernameIsValid && emailIsValid && passwordIsValid && cPasswordIsValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const user = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredCPassword,
    };
    setIsFetching(true);

    registerReq(user, setIsFetching, navigate);
  };

  return (
    <AuthForm onSubmit={formSubmitHandler}>
      <input
        onChange={usernameChangedHandler}
        onBlur={usernameBlurHandler}
        name="username"
        type="text"
        placeholder="Username"
        className={usernameHasError ? "invalid" : ""}
      />
      {usernameHasError ? <Error>First Name cannot be empty</Error> : ""}

      <input
        onChange={emailChangedHandler}
        onBlur={emailBlurHandler}
        name="email"
        type="email"
        placeholder="Email Address"
        className={emailHasError ? "invalid" : ""}
      />
      {emailHasError ? <Error>Looks like this is not an email</Error> : ""}

      <input
        onChange={passwordChangedHandler}
        onBlur={passwordBlurHandler}
        name="password"
        type="password"
        placeholder="Password"
        className={passwordHasError ? "invalid" : ""}
      />
      {passwordHasError ? (
        <Error>
          Must be 5 to 34 characters and includes uppercase, lowercase, a
          number, and special character. Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </Error>
      ) : (
        ""
      )}

      <input
        onChange={cPasswordChangedHandler}
        onBlur={cPasswordBlurHandler}
        name="cPassword"
        type="password"
        placeholder="Enter Password Again"
        className={cPasswordHasError ? "invalid" : ""}
      />
      {cPasswordHasError ? <Error>Password must match</Error> : ""}

      <button
        disabled={!formIsValid || isFetching ? true : false}
        type="submit"
      >
        {!isFetching && !formIsValid
          ? "Register"
          : isFetching && formIsValid
          ? "Sending...."
          : "Register"}
      </button>
      <p className="link">
        Already registered? Login <Link to="../login">here</Link>{" "}
      </p>
      <p className="terms">
        By clicking the button, you are agreeing to our{" "}
        <span>Terms and Services</span>
      </p>
    </AuthForm>
  );
};

export default RegisterForm;
