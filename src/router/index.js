import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register/index";
import Dashboard from "../pages/Home/Dashboard";

const routerConfig = createBrowserRouter([
  {
    path: "",
    element: <Auth />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      }
    ],
  },
]);

export default routerConfig;
