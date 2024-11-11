import React from 'react';
import { Bell, X } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { translations } from '../utils/translations';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { isDarkMode, language } = useThemeStore();
  const t = translations[language];

  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Tax Return Deadline',
      message: 'Your tax return is due in 15 days. Complete it now to avoid penalties.',
      time: '2 hours ago',
      type: 'warning',
    },
    {
      id: 2,
      title: 'Payment Confirmed',
      message: 'Your recent tax payment of 3,150,000 FCFA has been processed successfully.',
      time: '1 day ago',
      type: 'success',
    },
    {
      id: 3,
      title: 'New Tax Regulation',
      message: 'Important updates to business tax regulations. Click to learn more.',
      time: '2 days ago',
      type: 'info',
    },
  ];

  return (
    <div className="fixed right-4 top-20 w-96 z-50">
      <div className={`rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Notifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700' : ''}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b ${
                isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
              } cursor-pointer transition-colors`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {notification.title}
                </h4>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {notification.time}
                </span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {notification.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}