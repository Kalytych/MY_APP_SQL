import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../store/authStore';
import { useSettingsStore } from '../store/settingsStore';
import { useItemsStore } from '../store/itemsStore';

export const loadInitialData = async () => {
  const user = await AsyncStorage.getItem('user');
  const settings = await AsyncStorage.getItem('settings');
  const items = await AsyncStorage.getItem('items');

  if (user) useAuthStore.getState().setUser(JSON.parse(user));
  if (settings) {
    const parsed = JSON.parse(settings);
    useSettingsStore.getState().setTheme(parsed.theme);
    useSettingsStore.getState().setLanguage(parsed.language);
  }
  if (items && !useAuthStore.getState().sessionOnly) {
    useItemsStore.getState().setItems(JSON.parse(items));
  }
};
