export type TaxCategory = 'individual' | 'business' | 'self-employed';

export interface TaxProfile {
  id: string;
  category: TaxCategory;
  annualIncome: number;
  deductions: Deduction[];
  taxableIncome: number;
}

export interface Deduction {
  id: string;
  type: string;
  amount: number;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile: TaxProfile;
}