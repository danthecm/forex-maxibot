import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../config/axios";
import useInput from "../../../hooks/use-input";

import styles from "../Auth.module.css";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,34}$/;
const REGISTER_URL = "register/"

const Register = () => {
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

  const sendFormData = async (data) => {
    const loading = toast.loading("Registering....");
    try {
      await axios.post(REGISTER_URL, data);
      toast.update(loading, {
        render: "Verify your Email to continue",
        type: "success",
        isLoading: false,
        autoClose: true,
        closeButton: true,
      });
      setIsFetching(false);
      navigate("../login");
    } catch (error) {
      if (!error?.response) {
        toast.update(loading, {
          render: "No Server Response",
          type: "error",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
        return;
      }
      const response = error.response;
      switch (response?.status) {
        case 500:
          toast.update(loading, {
            render: "service unavailable, try later",
            type: "error",
            isLoading: false,
            autoClose: true,
            closeButton: true,
          });
          break;
        case 400:
          const data = response.data;
          for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
              const element = data[key];
              toast.update(loading, {
                render: element[0],
                type: "error",
                isLoading: false,
                autoClose: true,
                closeButton: true,
              });
            }
          }
          break;
        default:
          toast.update(loading, {
            render: "something went wrong, try later",
            type: "error",
            isLoading: false,
            autoClose: true,
            closeButton: true,
          });
          break;
      }
      setIsFetching(false);
    }
  };

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

    sendFormData(user);
  };

  return (
    <>
      <section className={styles.intro}>
        <h2 className={styles.h2}>Earn More</h2>
        <p className={styles.subText}>
          Maxibot takes away the stress of monitoring trades and helps you to
          place orders, monitor orders and maximise your profit.
        </p>
      </section>
      <section>
        <p className={styles.title}>
          <span>Get Started</span> for free
        </p>
        <div className={styles.card}>
          <form onSubmit={formSubmitHandler} action="" method="post">
            <input
              onChange={usernameChangedHandler}
              onBlur={usernameBlurHandler}
              name="username"
              type="text"
              placeholder="Username"
              className={usernameHasError ? styles.invalid : ""}
            />
            {usernameHasError ? (
              <p className={styles.error}>First Name cannot be empty</p>
            ) : (
              ""
            )}

            <input
              onChange={emailChangedHandler}
              onBlur={emailBlurHandler}
              name="email"
              type="email"
              placeholder="Email Address"
              className={emailHasError ? styles.invalid : ""}
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
              className={passwordHasError ? styles.invalid : ""}
            />
            {passwordHasError ? (
              <p className={styles.error}>
                Must be 5 to 34 characters and includes uppercase, lowercase, a
                number, and special character. Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            ) : (
              ""
            )}

            <input
              onChange={cPasswordChangedHandler}
              onBlur={cPasswordBlurHandler}
              name="cPassword"
              type="password"
              placeholder="Enter Password Again"
              className={cPasswordHasError ? styles.invalid : ""}
            />
            {cPasswordHasError ? (
              <p className={styles.error}>Password must match</p>
            ) : (
              ""
            )}

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
            <p className={styles.link}>
              Already registered? Login <Link to="../login">here</Link>{" "}
            </p>
            <p className={styles.terms}>
              By clicking the button, you are agreeing to our{" "}
              <span>Terms and Services</span>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};
export default Register;
