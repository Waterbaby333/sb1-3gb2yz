import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { TaxProfile, User } from '../types/tax';

interface TaxState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  calculateTax: (profile: TaxProfile) => number;
  updateProfile: (profile: Partial<TaxProfile>) => void;
}

export const useTaxStore = create<TaxState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      setUser: (user) => set({ user }),
      calculateTax: (profile) => {
        const { annualIncome, deductions } = profile;
        const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
        const taxableIncome = annualIncome - totalDeductions;
        
        let tax = 0;
        if (taxableIncome <= 900000) {
          tax = taxableIncome * 0.02;
        } else if (taxableIncome <= 4000000) {
          tax = 18000 + (taxableIncome - 900000) * 0.15;
        } else if (taxableIncome <= 8000000) {
          tax = 484500 + (taxableIncome - 4000000) * 0.25;
        } else if (taxableIncome <= 13500000) {
          tax = 1484500 + (taxableIncome - 8000000) * 0.35;
        } else {
          tax = 3359500 + (taxableIncome - 13500000) * 0.40;
        }
        
        return Math.round(tax);
      },
      updateProfile: (profile) =>
        set(
          produce((state: TaxState) => {
            if (state.user) {
              state.user.profile = { ...state.user.profile, ...profile };
            }
          })
        ),
    }),
    {
      name: 'tax-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);