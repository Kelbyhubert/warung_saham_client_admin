import jwtDecode from "jwt-decode";
import { createContext, useContext , useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if(token){
      const {user} = jwtDecode(token.replace("Bearer ", ""));
      setUser(user);
    }
  }, [])

  const logout = () => {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user,setUser,logout}}>
      {children}
    </AuthContext.Provider>
  )
}