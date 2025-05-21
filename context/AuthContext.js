import React, { createContext, useState, useContext } from 'react';

const users = [
  { username: 'admin', password: '1234' },
  { username: 'user', password: 'pass' },
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) setUser(found);
    return !!found;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
