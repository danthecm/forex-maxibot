import { AuthForm } from "../Styled";
import InputField from "../../InputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/use-input";
import { toast } from "react-toastify";
import axios from "../../../config/axios";
import { useState } from "react";
import { LOGIN_URL } from "../../../config/urls";
import useAuth from "../../../hooks/use-auth";

const LoginForm = () => {
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
      setAuth({ user: user.user, accessToken: user.access_token });
      localStorage.setItem("user", JSON.stringify(user));
      setIsFetching(false);
      setTimeout(() => {
        navigate(from, { replace: true });
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
          navigate(`../verify?username=${enteredUsername}`);
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
    <AuthForm onSubmit={formSubmitHandler}>
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
      <p className="link">
        Don't have an account? Register <Link to="../register">here</Link>
      </p>
      <p className="terms">
        By clicking the button, you are agreeing to our
        <span> Terms and Services</span>
      </p>
    </AuthForm>
  );
};

export default LoginForm;
