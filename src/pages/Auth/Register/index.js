import { Article, Card } from "../../../components/Auth/Styled";
import RegisterForm from "../../../components/Auth/RegisterForm";

const Register = () => {
  return (
    <>
      <Article>
        <h2>Earn More</h2>
        <p className="subText">
          Maxibot takes away the stress of monitoring trades and helps you to
          place orders, monitor orders and maximise your profit.
        </p>
      </Article>
      <section>
        <p className="title">
          <span>Get Started</span> for Free
        </p>
        <Card>
          <RegisterForm />
        </Card>
      </section>
    </>
  );
};
export default Register;
