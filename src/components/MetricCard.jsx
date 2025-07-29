import React from 'react';

const MetricCard = ({ icon: Icon, title, value, subtitle, color = "blue", trend = null }) => {
  const colorMap = {
    blue: "text-blue-500",
    purple: "text-purple-500",
    green: "text-green-500",
    orange: "text-orange-500",
    red: "text-red-500",
    yellow: "text-yellow-500"
  };

  const getTrendDisplay = (trend) => {
    if (!trend) return null;
    
    const trendConfig = {
      up: { text: '↗️ Trending up', color: 'text-green-500' },
      down: { text: '↘️ Trending down', color: 'text-red-500' },
      stable: { text: '→ Stable', color: 'text-gray-500' }
    };
    
    const config = trendConfig[trend];
    return (
      <div className={`text-sm ${config.color}`}>
        {config.text}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={colorMap[color]} size={20} />
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{subtitle}</div>
      {trend && getTrendDisplay(trend)}
    </div>
  );
};

export default MetricCard;