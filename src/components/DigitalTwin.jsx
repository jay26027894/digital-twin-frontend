import React from 'react';

const DigitalTwin = ({ mood, metrics }) => {
  const moodConfig = {
    excellent: { color: 'text-green-400', bg: 'bg-green-100', face: '😊', status: 'Thriving!' },
    good: { color: 'text-blue-400', bg: 'bg-blue-100', face: '😌', status: 'Doing well' },
    neutral: { color: 'text-yellow-400', bg: 'bg-yellow-100', face: '😐', status: 'Steady' },
    poor: { color: 'text-red-400', bg: 'bg-red-100', face: '😔', status: 'Needs care' }
  };
  
  const config = moodConfig[mood] || moodConfig.neutral;
  
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow border border-gray-100">
      <div className={`w-16 h-16 rounded-full ${config.bg} flex items-center justify-center text-2xl mb-2 transition-all duration-500`}>
        {config.face}
      </div>
      <h3 className={`text-sm font-semibold ${config.color} mb-1`}>Your Digital Twin</h3>
      <p className="text-gray-600 text-xs text-center">{config.status}</p>
      <div className="mt-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
        Productivity: {metrics.avgProductivity || 'N/A'}/10
      </div>
    </div>
  );
};

export default DigitalTwin;