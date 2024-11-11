import React, { Suspense, lazy } from 'react';
import { BarChart3, FileText, Users, Wallet, Moon, Sun, Bell } from 'lucide-react';
import { formatFCFA } from '../utils/formatters';
import { useThemeStore } from '../store/themeStore';
import { translations } from '../utils/translations';
import ProgressTracker from './ProgressTracker';
import LanguageToggle from './LanguageToggle';

const TaxCalculator = lazy(() => import('./TaxCalculator'));
const PaymentModal = lazy(() => import('./PaymentModal'));
const NotificationCenter = lazy(() => import('./NotificationCenter'));

const LoadingFallback = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
);

export default function Dashboard() {
  const { isDarkMode, toggleDarkMode, language } = useThemeStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const t = translations[language];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm fixed w-full z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className={`ml-2 text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                TaxPortal
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-full hover:bg-opacity-10"
                aria-label="Toggle notifications"
              >
                <Bell className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
              </button>
              <LanguageToggle />
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full hover:bg-opacity-10 ${
                  isDarkMode ? 'hover:bg-white text-white' : 'hover:bg-gray-900 text-gray-600'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <Suspense fallback={<LoadingFallback />}>
          <ProgressTracker />
        </Suspense>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.totalTaxDue}
                </p>
                <p className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatFCFA(8250000)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {t.payNow}
            </button>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.submittedReturns}
                </p>
                <p className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.deductions}
                </p>
                <p className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatFCFA(2780000)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Suspense fallback={<LoadingFallback />}>
            <TaxCalculator />
          </Suspense>
          
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t.recentActivity}
              </h2>
            </div>
            
            <div className="space-y-4">
              {[
                { date: '2024-03-15', action: t.returnSubmitted, amount: formatFCFA(5420000) },
                { date: '2024-03-10', action: t.deductionAdded, amount: formatFCFA(1200000) },
                { date: '2024-03-05', action: t.paymentMade, amount: formatFCFA(3150000) },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between py-3 border-b ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-100'
                  } last:border-0`}
                >
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.action}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.date}
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        {isPaymentModalOpen && (
          <PaymentModal
            amount={8250000}
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
          />
        )}
        
        {isNotificationOpen && (
          <NotificationCenter
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}