import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Auth/register";

const RouterConfig = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                index: true,
                element: <Register />

            }
        ]


    }
])

export default RouterConfig