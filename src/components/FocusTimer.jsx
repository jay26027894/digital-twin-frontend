import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

const FocusTimer = ({ title = "🕒 Focus Timer" }) => {
  const [timer, setTimer] = useState(25 * 60); // 25 minutes default
  const [customMinutes, setCustomMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      // Timer finished
      setIsRunning(false);
      setSessions(prev => prev + 1);
      // You could add notification/sound here
      alert('Focus session completed! 🎉');
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(customMinutes * 60);
  };

  const updateTimer = () => {
    if (!isRunning) {
      const seconds = parseInt(customMinutes) * 60;
      setTimer(seconds);
    }
  };

  const getProgressPercentage = () => {
    const totalSeconds = customMinutes * 60;
    return ((totalSeconds - timer) / totalSeconds) * 100;
  };

  const presetTimes = [15, 25, 45, 60];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-blue-500" size={20} />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      
      <div className="text-center">
        {/* Timer Display */}
        <div className="relative mb-6">
          <div className="text-6xl font-mono mb-2 text-gray-800">
            {formatTime(timer)}
          </div>
          
          {/* Progress Circle */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`${isRunning ? 'text-blue-500' : 'text-gray-400'} transition-colors duration-300`}
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${getProgressPercentage()}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-gray-600">
                {Math.round(getProgressPercentage())}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={handleStart}
            className={`${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            } text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 font-medium"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>
        
        {/* Timer Settings */}
        <div className="space-y-4">
          {/* Preset Buttons */}
          <div className="flex gap-2 justify-center mb-3">
            {presetTimes.map(time => (
              <button
                key={time}
                onClick={() => {
                  setCustomMinutes(time);
                  if (!isRunning) setTimer(time * 60);
                }}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  customMinutes === time 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {time}m
              </button>
            ))}
          </div>
          
          {/* Custom Timer */}
          <div className="flex gap-2 items-center justify-center">
            <input
              type="number"
              min="1"
              max="120"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              className="w-20 p-2 border rounded-lg text-center"
              disabled={isRunning}
            />
            <span className="text-sm text-gray-600">minutes</span>
            <button
              onClick={updateTimer}
              disabled={isRunning}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Set
            </button>
          </div>
        </div>

        {/* Session Counter */}
        {sessions > 0 && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm text-green-700 font-medium">
              🎯 Sessions completed today: {sessions}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FocusTimer;