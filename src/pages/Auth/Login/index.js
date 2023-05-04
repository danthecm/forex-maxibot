import { Card } from "../../../components/Auth/Styled";
import LoginForm from "../../../components/Auth/LoginFom";

const Login = () => {
  return (
    <>
      <section className="intro">
        <h2>Welcome Back</h2>
        <p className="subText">
          We are glad to have you back, kindly fill in your details to continue
        </p>
      </section>
      <section>
        <p className="title">
          <span>Login</span> to continue
        </p>
        <Card>
          <LoginForm />
        </Card>
      </section>
    </>
  );
};
export default Login;
