// context/StorageContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageContext = createContext();

export const StorageProvider = ({ children }) => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const json = await AsyncStorage.getItem('savedPosts');
      if (json) {
        setSavedPosts(JSON.parse(json));
      }
    };
    loadPosts();
  }, []);

  const savePosts = async (posts) => {
    setSavedPosts(posts);
    await AsyncStorage.setItem('savedPosts', JSON.stringify(posts));
  };

  return (
    <StorageContext.Provider value={{ savedPosts, savePosts }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => useContext(StorageContext);
