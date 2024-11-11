import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  language: 'en' | 'fr';
  toggleDarkMode: () => void;
  setLanguage: (lang: 'en' | 'fr') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      language: 'fr',
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'theme-storage',
    }
  )
);