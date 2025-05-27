import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import { loadInitialData } from './utils/loadInitialData';
import { GlobalProvider } from './context/GlobalContext';
import { UserProvider } from './context/UserContext'; // Додано правильний імпорт

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <UserProvider> {/* 👈 Інтеграція UserContext */}
      <GlobalProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </AuthProvider>
      </GlobalProvider>
    </UserProvider>
  );
}
