import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register/index";

const routerConfig = createBrowserRouter([
    {
        path: '',
        element: <Auth />,
        children: [
            {
                index: true,
                element: <Register />

            },
            {
                path: "/login",
                element: <Login />
            }
        ]


    }
])

export default routerConfig