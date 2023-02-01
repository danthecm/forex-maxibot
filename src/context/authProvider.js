import { createContext, useEffect, useState } from "react";


const authContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const check = localStorage.getItem("user")
    const user = JSON.parse(check)
    if (user) {
        setAuth({user: user?.user, accessToken: user.access_token});
    }

},[]
)
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
