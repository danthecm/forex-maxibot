import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import useInput from "../../../hooks/use-input";

import "react-toastify/dist/ReactToastify.css";

import styles from "../Auth.module.css";

const Register = () => {
  const navigate = useNavigate()

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
  } = useInput((value) => value.length > 3);

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
      const sendData = await axios.post(
        "https://forex.themaxibot.com/register/",
        data
      );
      console.log("Your request data is:", sendData);
      toast.update(loading, {
        render: "Successfully Registered",
        type: "success",
        isLoading: false,
      });
      setIsFetching(false);
    } catch (error) {
      const response = error.response;
      const status = response.status;
      switch (status) {
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
    console.log(user);
  };

  return (
    <>
      <div>
        <h2>Earn More</h2>
        <p className={styles.subText}>
          Maxibot takes away the stress of monitoring trades and helps you to
          place orders, monitor orders and maximise your profit.
        </p>
      </div>
      <div>
        <p className={styles.intro}>
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
              className={usernameHasError ? "invalid" : ""}
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

            <input
              onChange={cPasswordChangedHandler}
              onBlur={cPasswordBlurHandler}
              name="cPassword"
              type="password"
              placeholder="Enter Password Again"
              className={cPasswordHasError ? "invalid" : ""}
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
                ? "Please the form correctly"
                : isFetching && formIsValid
                ? "Sending...."
                : "Register"}
            </button>
            <p className={styles.terms}>
              By clicking the button, you are agreeing to our{" "}
              <span>Terms and Services</span>
            </p>
            <p className={styles.link}>
              Already registered Login <Link to="/login">here</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
