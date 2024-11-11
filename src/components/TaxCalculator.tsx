import React, { useState } from 'react';
import { Calculator, FileText } from 'lucide-react';
import { useTaxStore } from '../store/taxStore';
import { useThemeStore } from '../store/themeStore';
import { TaxCategory } from '../types/tax';
import { formatFCFA } from '../utils/formatters';
import { translations } from '../utils/translations';

export default function TaxCalculator() {
  const [income, setIncome] = useState('');
  const [category, setCategory] = useState<TaxCategory>('individual');
  const [calculatedTax, setCalculatedTax] = useState<number | null>(null);
  const calculateTax = useTaxStore((state) => state.calculateTax);
  const { isDarkMode, language } = useThemeStore();
  const t = translations[language];

  const handleCalculate = () => {
    const tax = calculateTax({
      id: '1',
      category,
      annualIncome: Number(income),
      deductions: [],
      taxableIncome: Number(income)
    });
    setCalculatedTax(tax);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 max-w-md w-full`}>
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {t.taxCalculator}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            {t.taxCategory}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TaxCategory)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="individual">{t.individual}</option>
            <option value="business">{t.business}</option>
            <option value="self-employed">{t.selfEmployed}</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            {t.annualIncome} (FCFA)
          </label>
          <div className="relative">
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="0"
            />
          </div>
        </div>

        {calculatedTax !== null && (
          <div className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.estimatedTax}
            </p>
            <p className="text-2xl font-bold text-blue-600">{formatFCFA(calculatedTax)}</p>
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          {t.calculateTax}
        </button>
      </div>
    </div>
  );
}