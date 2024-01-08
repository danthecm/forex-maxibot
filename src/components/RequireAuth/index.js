import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth?.user ? (
    auth?.user?.trade_profile.length <= 0 ? (
      <Navigate to="/new-platform" state={{ from: location }} replace />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="auth/login/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
