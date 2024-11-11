import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { translations } from '../utils/translations';

export default function ProgressTracker() {
  const { isDarkMode, language } = useThemeStore();
  const t = translations[language];

  const steps = [
    { id: 1, name: 'Personal Info', completed: true },
    { id: 2, name: 'Income Details', completed: true },
    { id: 3, name: 'Deductions', completed: true },
    { id: 4, name: 'Review', completed: false },
    { id: 5, name: 'Submit', completed: false },
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm p-6`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              {step.completed ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <Circle className={`w-8 h-8 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              )}
              <p className={`mt-2 text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {step.name}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${
                steps[index + 1].completed
                  ? 'bg-green-500'
                  : isDarkMode
                  ? 'bg-gray-700'
                  : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}