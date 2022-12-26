import { createBrowserRouter } from "react-router-dom";
import App from "../App";
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
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      }
    ],
  },
]);

export default routerConfig;
