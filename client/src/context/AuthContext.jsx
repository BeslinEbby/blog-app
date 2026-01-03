import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(() => {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
   });
   const [token, setToken] = useState(() => {
      const t = localStorage.getItem("token");
      return t ? t : null;
   });

   const logIn = ( token, user ) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);
   };

   const logOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
   };

   return <AuthContext.Provider value={{ user, token, logIn, logOut }}>{children}</AuthContext.Provider>;
};
