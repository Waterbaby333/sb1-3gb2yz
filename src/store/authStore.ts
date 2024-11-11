import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import { LoginCredentials, RegisterData } from '../types/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  savedEmails: string[];
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  saveEmail: (email: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      savedEmails: [],
      login: async (credentials) => {
        // In a real app, this would make an API call
        const storedUser = sessionStorage.getItem(`user_${credentials.email}`);
        if (!storedUser) {
          throw new Error('Invalid credentials');
        }

        const user = JSON.parse(storedUser);
        if (user.password !== credentials.password) {
          throw new Error('Invalid credentials');
        }

        set({ isAuthenticated: true, user: { name: user.name, email: user.email } });
      },
      register: async (data) => {
        // In a real app, this would make an API call
        sessionStorage.setItem(`user_${data.email}`, JSON.stringify(data));
        set({ 
          isAuthenticated: true,
          user: { name: data.name, email: data.email },
          savedEmails: (state) => [...new Set([...state.savedEmails, data.email])]
        });
      },
      logout: () => set({ isAuthenticated: false, user: null }),
      saveEmail: (email) =>
        set(
          produce((state: AuthState) => {
            if (!state.savedEmails.includes(email)) {
              state.savedEmails.push(email);
            }
          })
        ),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        savedEmails: state.savedEmails,
        isAuthenticated: state.isAuthenticated,
        user: state.user
      }),
    }
  )
);</content>