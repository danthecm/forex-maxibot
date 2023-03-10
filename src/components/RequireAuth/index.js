import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const RequireAuth = () => {
  const location = useLocation();
  const {auth} = useAuth();

  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="auth/login/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
