// context/GlobalContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light'); // light | dark
  const [language, setLanguage] = useState('uk'); // uk | en
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const email = await AsyncStorage.getItem('userEmail');
      const storedTheme = await AsyncStorage.getItem('appTheme');
      const storedLang = await AsyncStorage.getItem('appLanguage');

      if (token && email) setUser({ email, token });
      if (storedTheme) setTheme(storedTheme);
      if (storedLang) setLanguage(storedLang);

      setLoading(false);
    };
    loadInitialData();
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1',
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setUser({ email: username, token: data.token });
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userEmail', username);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Login error:', e);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userEmail');
  };

  const updateTheme = async (newTheme) => {
    setTheme(newTheme);
    await AsyncStorage.setItem('appTheme', newTheme);
  };

  const updateLanguage = async (newLang) => {
    setLanguage(newLang);
    await AsyncStorage.setItem('appLanguage', newLang);
  };

  return (
    <GlobalContext.Provider
      value={{
        user, login, logout,
        theme, updateTheme,
        language, updateLanguage,
        posts, setPosts,
        loading,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
