import axios from "../../../config/axios";
import { useState } from "react";
import useInput from "../../../hooks/use-input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../Auth.module.css";
import { toast } from "react-toastify";
import InputField from "../../../components/InputField";
import useAuth from "../../../hooks/use-auth";

const LOGIN_URL = "login/";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isFetching, setIsFetching] = useState(false);
  const userNameHook = useInput((value) => value.trim() !== "");
  const { value: enteredUsername, isValid: usernameIsValid } = userNameHook;
  const passwordHook = useInput((value) => value.length > 1);
  const { value: enteredPassword, isValid: passwordIsValid } = passwordHook;

  const formIsValid = usernameIsValid && passwordIsValid;

  const sendFormData = async (data) => {
    const loading = toast.loading("Authenticating");
    try {
      const sendData = await axios.post(LOGIN_URL, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.update(loading, {
        render: "Successfully Authenticated",
        type: "success",
        isLoading: false,
        autoClose: true,
        closeButton: true,
      });
      const user = sendData.data;
      setAuth({user: user.user, accessToken: user.access_token})
      localStorage.setItem("user", JSON.stringify(user));
      setIsFetching(false);
      setTimeout(() => {
        navigate(from, {replace: true});
      }, 1000);
    } catch (error) {
      const response = error?.response;
      if (!response) {
        toast.update(loading, {
          render: "No Server Response",
          type: "error",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
        setIsFetching(false);
        return;
      }
      const data = response?.data;
      console.log("There was an error", error);
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
        case 401:
          toast.update(loading, {
            render: data.detail,
            type: "error",
            isLoading: false,
            autoClose: true,
            closeButton: true,
          });
          break;
        case 406:
          toast.update(loading, {
            render: data.detail,
            type: "error",
            isLoading: false,
            autoClose: true,
            closeButton: true,
          });
          navigate(`/verify?username=${enteredUsername}`);
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
      password: enteredPassword,
    };
    setIsFetching(true);

    sendFormData(user);
  };

  return (
    <>
      <section className={styles.intro}>
        <h2 className={styles.h2}>Welcome Back</h2>
        <p className={styles.subText}>
          We are glad to have you back, kindly fill in your details to continue
        </p>
      </section>
      <section>
        <p className={styles.title}>
          <span>Login</span> to continue
        </p>
        <div className={styles.card}>
          <form onSubmit={formSubmitHandler} method="post">
            <InputField
              name="username"
              type="text"
              placeholder="Username"
              message="Username cannot be empty"
              autoComplete="false"
              hook={userNameHook}
            />

            <InputField
              name="password"
              type="password"
              placeholder="Password"
              message="Password cannot be empty"
              autoComplete="false"
              hook={passwordHook}
            />

            <button
              disabled={!formIsValid || isFetching ? true : false}
              type="submit"
            >
              {!isFetching && !formIsValid
                ? "Login"
                : isFetching && formIsValid
                ? "Please wait...."
                : "Login"}
            </button>
            <p className={styles.link}>
              Don't have an account? Register <Link to="../register">here</Link>
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
export default Login;
