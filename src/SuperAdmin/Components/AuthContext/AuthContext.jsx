import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ensure this is the correct import for jwt-decode

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setUser({
      role: decodedToken.role,
      token,
    });
    localStorage.setItem('authToken', token); // Optionally store token in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext }; // Ensure this line is present
