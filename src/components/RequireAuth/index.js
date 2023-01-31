import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "../../context/authProvider";
import useAuth from "../../hooks/use-auth";

const RequireAuth = () => {
  const location = useLocation();
  const {auth} = useAuth();

  return auth?.user ? (
    <AuthProvider>
       <Outlet />
    </AuthProvider>
   
  ) : (
    <Navigate to="login/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
