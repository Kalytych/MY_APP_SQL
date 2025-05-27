import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [saveToStorage, setSaveToStorage] = useState(true); // режим збереження

  useEffect(() => {
    const loadUser = async () => {
      const json = await AsyncStorage.getItem('user');
      if (json) {
        setUser(JSON.parse(json));
      }
    };
    if (saveToStorage) loadUser();
  }, [saveToStorage]);

  const updateUser = async (newUser) => {
    setUser(newUser);
    if (saveToStorage) {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  const logout = async () => {
    setUser(null);
    if (saveToStorage) {
      await AsyncStorage.removeItem('user');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, logout, saveToStorage, setSaveToStorage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
