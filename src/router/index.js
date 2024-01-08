import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RequireAuth from "../components/RequireAuth";
import Auth from "../pages/Auth";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register/index";
import Verify from "../pages/Auth/Verficiation/Verify";
import Dashboard from "../pages/Home/";
import PlatformReg from "../pages/Auth/PlatformReg";

const routerConfig = createBrowserRouter([
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify",
        element: <Verify />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "",
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "new-platform",
    element: <Auth />,
    children: [{ index: true, element: <PlatformReg /> }],
  },
]);

export default routerConfig;
