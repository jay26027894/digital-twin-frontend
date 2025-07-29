import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const BehaviorRadarChart = ({ behaviors, metrics, title = "Behavior Patterns" }) => {
  if (!behaviors || behaviors.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No behavior data available
        </div>
      </div>
    );
  }

  const radarData = [{
    metric: 'Sleep',
    value: parseFloat(metrics.avgSleep || 0) * 1.25,
    fullMark: 10
  }, {
    metric: 'Work',
    value: Math.min(10, parseFloat(metrics.avgWorkHours || 0) * 1.2),
    fullMark: 10
  }, {
    metric: 'Screen',
    value: Math.max(0, 10 - parseFloat(metrics.avgScreenTime || 0) * 0.8),
    fullMark: 10
  }, {
    metric: 'Productivity',
    value: parseFloat(metrics.avgProductivity || 0),
    fullMark: 10
  }, {
    metric: 'Exercise',
    value: behaviors.slice(-7).reduce((sum, b) => sum + (b.exercise || 0), 0) * 2,
    fullMark: 10
  }, {
    metric: 'Mood',
    value: behaviors.slice(-7).reduce((sum, b) => sum + (b.mood || 5), 0) / 7,
    fullMark: 10
  }];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 10]} tick={false} />
          <Radar
            name="Your Pattern"
            dataKey="value"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-600">
        <div className="text-center">
          <div className="font-medium">Sleep</div>
          <div>{metrics.avgSleep || 'N/A'}h avg</div>
        </div>
        <div className="text-center">
          <div className="font-medium">Exercise</div>
          <div>{(behaviors.slice(-7).reduce((sum, b) => sum + (b.exercise || 0), 0) / 7).toFixed(1)}h avg</div>
        </div>
        <div className="text-center">
          <div className="font-medium">Mood</div>
          <div>{(behaviors.slice(-7).reduce((sum, b) => sum + (b.mood || 5), 0) / 7).toFixed(1)}/10</div>
        </div>
      </div>
    </div>
  );
};

export default BehaviorRadarChart;