import { AuthForm } from "../Styled";
import InputField from "../../InputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/use-input";
import { useState } from "react";
import useAuth from "../../../hooks/use-auth";
import { loginReq } from "../../../services/auth";

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

    loginReq(user, from, setIsFetching, setAuth, navigate);
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
