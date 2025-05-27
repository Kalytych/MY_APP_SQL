import { create } from 'zustand';

export const useSettingsStore = create((set) => ({
  theme: 'light',
  language: 'uk',

  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
}));
