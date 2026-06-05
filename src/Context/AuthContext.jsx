import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const selectRole = (role) => {
    setUserRole(role);
  };

  const loginUser = (roleData) => {
    setUserRole(roleData);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ userRole, selectRole, isAuthenticated, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);