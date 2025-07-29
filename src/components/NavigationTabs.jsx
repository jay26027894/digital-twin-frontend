import React from 'react';
import { Calendar, Brain, TrendingUp, Target } from 'lucide-react';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'behavior', label: 'Behavior Log', icon: Calendar },
    { id: 'tasks', label: 'Tasks & Focus', icon: Target },
    { id: 'insights', label: 'AI Insights', icon: Brain }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon size={18} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default NavigationTabs;