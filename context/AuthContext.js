import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const email = await AsyncStorage.getItem('userEmail');
      if (token && email) {
        setUser({ email, token });
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (username, password) => {
  console.log('Спроба логіну з:', username, password);

  try {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1', // 🛠️ ДОДАЙ API-ключ
      },
      body: JSON.stringify({ email: username, password }),
    });

    console.log('Статус відповіді:', response.status);
    const data = await response.json();
    console.log('Відповідь від API:', data);

    if (response.ok) {
      setUser({ email: username, token: data.token });
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userEmail', username);
      return true;
    } else {
      console.warn('Login failed:', data.error);
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};



  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
