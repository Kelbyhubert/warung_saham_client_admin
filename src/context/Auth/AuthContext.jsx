import jwtDecode from "jwt-decode";
import { createContext, useContext , useEffect, useState } from "react";
import Proptypes from 'prop-types';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = (props) => {
  const [user, setUser] = useState(''); 

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
      {props.children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: Proptypes.node.isRequired
}