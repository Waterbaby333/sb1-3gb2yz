import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function LanguageToggle() {
  const { isDarkMode, language, setLanguage } = useThemeStore();
  
  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
        isDarkMode 
          ? 'border-gray-700 hover:bg-gray-700 text-white' 
          : 'border-gray-200 hover:bg-gray-100 text-gray-600'
      }`}
      aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
    >
      <span className={`text-sm font-medium ${language === 'en' ? 'text-blue-500' : ''}`}>EN</span>
      <ArrowLeftRight className="w-4 h-4" />
      <span className={`text-sm font-medium ${language === 'fr' ? 'text-blue-500' : ''}`}>FR</span>
    </button>
  );
}