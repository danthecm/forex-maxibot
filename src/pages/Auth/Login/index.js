import axios from "axios";
import { useState } from "react";
import useInput from "../../../hooks/use-input";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [isFetching, setIsFetching] = useState(false);
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
  } = useInput((value) => value.length > 6);

  const formIsValid = emailIsValid && passwordIsValid;

  const sendFormData = async (data) => {
    try {
      const sendData = await axios.post(
        "https://react-http-9e293-default-rtdb.firebaseio.com/cart.json",
        data
      );
      console.log("Sent Data", sendData);
      setIsFetching(false);
    } catch (error) {
      console.log("There was an error sending data", error);
      setIsFetching(false);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };
    setIsFetching(true);

    sendFormData(user);
    console.log(user);
  };

  return (
    <>
      <div>
        <h2>Welcome Back</h2>
        <p className={styles.subText}>
          We are glad to have you back, kindly fill in your details to continue
        </p>
      </div>
      <div>
        <p className={styles.intro}>
          <span>Login</span> to continue
        </p>
        <div className={styles.card}>
          <form onSubmit={formSubmitHandler} action="" method="post">
            <input
              onChange={emailChangedHandler}
              onBlur={emailBlurHandler}
              name="email"
              type="email"
              placeholder="Email Address"
              className={emailHasError ? "invalid" : ""}
            />
            {emailHasError ? (
              <p className={styles.error}>Looks like this is not an email</p>
            ) : (
              ""
            )}

            <input
              onChange={passwordChangedHandler}
              onBlur={passwordBlurHandler}
              name="password"
              type="password"
              placeholder="Password"
              className={passwordHasError ? "invalid" : ""}
            />
            {passwordHasError ? (
              <p className={styles.error}>Password cannot be empty</p>
            ) : (
              ""
            )}

            <button
              disabled={!formIsValid || isFetching ? true : false}
              type="submit"
            >
              {isFetching ? "...Please wait..." : "Login"}
            </button>
            <p className={styles.terms}>
              By clicking the button, you are agreeing to our
              <span>Terms and Services</span>
            </p>
            <p className={styles.nextPage}>
              Don't have an account register <Link to="/register">here</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
