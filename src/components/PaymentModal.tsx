import React from 'react';
import { QrCode, Smartphone, CreditCard } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { translations } from '../utils/translations';

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  isOpen: boolean;
}

export default function PaymentModal({ amount, onClose, isOpen }: PaymentModalProps) {
  const { language, isDarkMode } = useThemeStore();
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-md w-full rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.payNow}
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-full hover:bg-opacity-10 ${
                isDarkMode ? 'hover:bg-white' : 'hover:bg-gray-900'
              }`}
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <button
              className={`w-full p-4 rounded-lg flex items-center gap-4 border transition-colors ${
                isDarkMode
                  ? 'border-gray-700 hover:border-blue-500 text-white'
                  : 'border-gray-200 hover:border-blue-500'
              }`}
            >
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Orange Money / Wave / MTN Mobile Money
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.mobilePayment}
                </p>
              </div>
            </button>

            <button
              className={`w-full p-4 rounded-lg flex items-center gap-4 border transition-colors ${
                isDarkMode
                  ? 'border-gray-700 hover:border-blue-500 text-white'
                  : 'border-gray-200 hover:border-blue-500'
              }`}
            >
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  VISA / Mastercard
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t.bankTransfer}
                </p>
              </div>
            </button>

            <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex justify-center mb-4">
                <QrCode className="w-32 h-32 text-blue-600" />
              </div>
              <p className={`text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Scan to pay with any mobile payment app
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}