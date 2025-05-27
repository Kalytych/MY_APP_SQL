import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  sessionOnly: false,

  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  setSessionOnly: (value) => set({ sessionOnly: value }),
}));
