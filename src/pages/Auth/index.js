import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../logo.svg";
import { AuthContainer, Main } from "../../components/Auth/Styled";

const Auth = () => {
  return (
    <Main>
      <Logo className="logo" />
      <AuthContainer>
        <Outlet />
      </AuthContainer>
    </Main>
  );
};

export default Auth;
