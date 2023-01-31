import { useContext } from "react";
import authContext from "../context/authProvider";

const useAuth = () => {
    return useContext(authContext)
}

export default useAuth