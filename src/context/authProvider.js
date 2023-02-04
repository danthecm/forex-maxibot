import { createContext, useState } from "react";

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  if (JSON.stringify(auth) === "{}") {
    const check = localStorage.getItem("user");
    const user = JSON.parse(check);
    if (user) {
      setAuth({ user: user?.user, accessToken: user.access_token });
      return;
    }
  }
  setTimeout(() => {
    localStorage.removeItem("user")
    window.location.reload(false)
  }, 3000000)
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
