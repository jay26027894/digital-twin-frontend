// Home.jsx - Fixed Version
import React, { useEffect, useState, useMemo } from "react";
import { Calendar, User, Target, Moon, Coffee, Clock, Trash2, Zap, TrendingUp } from 'lucide-react';
import { getSuggestions } from "../lib/cohere"; // Add this import
import { useNavigate } from 'react-router-dom';

// Import all the components
import DigitalTwin from "../components/DigitalTwin";
import MetricCard from "../components/MetricCard";
import NavigationTabs from "../components/NavigationTabs";
import ProductivityChart from "../components/ProductivityChart";
import BehaviorRadarChart from "../components/BehaviorRadarChart";
import TaskManager from "../components/TaskManager";
import FocusTimer from "../components/FocusTimer";
import SmartNotifications from "../components/SmartNotifications";
import BehaviorEntryForm from "../components/BehaviorEntryForm";
import AIInsightsPanel from "../components/AIInsightsPanel";

function Home() {
  const navigate = useNavigate();
  // All your existing state and logic stays the same
  const [persona, setPersona] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [behaviors, setBehaviors] = useState(() => {
    const stored = localStorage.getItem("behaviors");
    return stored ? JSON.parse(stored) : [];
  });
  const [currentEntry, setCurrentEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    sleep: 0,
    screenTime: 0,
    workHours: 0,
    meals: 0,
    exercise: 0,
    focusTime: 0,
    breaks: 0,
    socialTime: 0,
    mood: 5,
    energy: 5,
    productivity: 5,
    stress: 5,
    notes: ''
  });
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("userTasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [aiSuggestions, setAiSuggestions] = useState(() => {
    const saved = localStorage.getItem("aiSuggestions");
    return saved ? JSON.parse(saved) : null;
  });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Poor sleep detected for 2+ days. Consider earlier bedtime.',
      action: 'Aim for 7-8 hours tonight'
    },
    {
      id: 2,
      type: 'suggestion',
      message: 'Try adding 20 minutes of exercise to boost productivity.',
      action: 'Schedule workout'
    }
  ]);
  const [twinMood, setTwinMood] = useState('neutral');

  // Load persona on component mount
  useEffect(() => {
    const stored = localStorage.getItem("userPersona");
    if (stored) {
      setPersona(JSON.parse(stored));
    }
  }, []);

  // Initialize with empty data - no pre-filled entries
  useEffect(() => {
    // Only load existing data, don't generate sample data
    const stored = localStorage.getItem("behaviors");
    if (stored) {
      setBehaviors(JSON.parse(stored));
    }
  }, []);

  const generateSampleData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 14; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const sleep = 6 + Math.random() * 3;
      const screenTime = 4 + Math.random() * 6;
      const workHours = 6 + Math.random() * 4;
      const meals = 2 + Math.floor(Math.random() * 2);
      const exercise = Math.random() > 0.6 ? Math.floor(Math.random() * 2) + 1 : 0;
      const mood = Math.floor(Math.random() * 5) + 3;
      
      // Productivity formula based on habits
      const productivity = Math.min(10, Math.max(1, 
        (sleep > 7 ? 2 : sleep > 6 ? 1 : 0) +
        (screenTime < 6 ? 2 : screenTime < 8 ? 1 : 0) +
        (workHours > 6 && workHours < 9 ? 2 : 1) +
        (meals >= 3 ? 1 : 0) +
        (exercise > 0 ? 2 : 0) +
        (mood > 6 ? 1 : 0) + 
        Math.random() * 2
      ));
      
      data.push({
        date: date.toISOString().split('T')[0],
        sleep: parseFloat(sleep.toFixed(1)),
        screenTime: parseFloat(screenTime.toFixed(1)),
        workHours: parseFloat(workHours.toFixed(1)),
        meals,
        exercise,
        mood,
        productivity: parseFloat(productivity.toFixed(1))
      });
    }
    
    return data;
  };

  // Enhanced metrics calculation based on setup data
  const metrics = useMemo(() => {
    if (behaviors.length === 0) return {};
    
    const recent = behaviors.slice(-7);
    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    
    // Basic metrics
    const avgProductivity = avg(recent.map(b => b.productivity));
    const avgSleep = avg(recent.map(b => b.sleep));
    const avgScreenTime = avg(recent.map(b => b.screenTime));
    const avgWorkHours = avg(recent.map(b => b.workHours));
    const avgMood = avg(recent.map(b => b.mood));
    const avgEnergy = avg(recent.map(b => b.energy || 5));
    const avgStress = avg(recent.map(b => b.stress || 5));
    
    // New detailed metrics
    const avgExercise = avg(recent.map(b => b.exercise || 0));
    const avgFocusTime = avg(recent.map(b => b.focusTime || 0));
    const avgSocialTime = avg(recent.map(b => b.socialTime || 0));
    const avgBreaks = avg(recent.map(b => b.breaks || 0));
    
    // Trends
    const productivityTrend = recent.length > 3 ? 
      (recent.slice(-3).reduce((a, b) => a + b.productivity, 0) / 3) - 
      (recent.slice(0, 3).reduce((a, b) => a + b.productivity, 0) / 3) : 0;
    
    const moodTrend = recent.length > 3 ? 
      (recent.slice(-3).reduce((a, b) => a + (b.mood || 5), 0) / 3) - 
      (recent.slice(0, 3).reduce((a, b) => a + (b.mood || 5), 0) / 3) : 0;
    
    const nextWeekPrediction = Math.min(10, Math.max(1, avgProductivity + productivityTrend));
    
    // Analysis based on setup data
    const persona = JSON.parse(localStorage.getItem("userPersona") || "{}");
    let recommendations = [];
    
    // Sleep analysis
    if (avgSleep < 7 && persona.sleepSchedule) {
      recommendations.push("Consider improving sleep quality - aim for 7-9 hours");
    }
    
    // Screen time analysis
    if (avgScreenTime > 8 && persona.screenTimePreference === "minimal") {
      recommendations.push("Screen time is high - try digital detox techniques");
    }
    
    // Exercise analysis
    if (avgExercise < 0.5 && persona.exerciseFrequency !== "none") {
      recommendations.push("Exercise levels are low - try short daily workouts");
    }
    
    // Work-life balance
    if (avgWorkHours > 9 && avgSocialTime < 1) {
      recommendations.push("Consider work-life balance - schedule social time");
    }
    
    return {
      // Basic metrics
      avgProductivity: avgProductivity.toFixed(1),
      avgSleep: avgSleep.toFixed(1),
      avgScreenTime: avgScreenTime.toFixed(1),
      avgWorkHours: avgWorkHours.toFixed(1),
      avgMood: avgMood.toFixed(1),
      avgEnergy: avgEnergy.toFixed(1),
      avgStress: avgStress.toFixed(1),
      
      // New detailed metrics
      avgExercise: avgExercise.toFixed(1),
      avgFocusTime: avgFocusTime.toFixed(1),
      avgSocialTime: avgSocialTime.toFixed(1),
      avgBreaks: avgBreaks.toFixed(1),
      
      // Trends and predictions
      nextWeekPrediction: nextWeekPrediction.toFixed(1),
      productivityTrend: productivityTrend > 0 ? 'up' : productivityTrend < 0 ? 'down' : 'stable',
      moodTrend: moodTrend > 0 ? 'up' : moodTrend < 0 ? 'down' : 'stable',
      
      // Analysis
      recommendations: recommendations.slice(0, 3), // Top 3 recommendations
      totalEntries: behaviors.length,
      streakDays: behaviors.length > 0 ? Math.min(behaviors.length, 7) : 0
    };
  }, [behaviors]);

  // Update twin mood based on recent productivity
  useEffect(() => {
    if (metrics.avgProductivity) {
      const score = parseFloat(metrics.avgProductivity);
      if (score >= 8) setTwinMood('excellent');
      else if (score >= 6) setTwinMood('good');
      else if (score >= 4) setTwinMood('neutral');
      else setTwinMood('poor');
    }
  }, [metrics.avgProductivity]);

  // Your existing functions
  const handleAddEntry = () => {
    const updatedBehaviors = [...behaviors, { ...currentEntry, id: Date.now() }];
    setBehaviors(updatedBehaviors);
    localStorage.setItem("behaviors", JSON.stringify(updatedBehaviors));
    setCurrentEntry(prev => ({
      ...prev,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      sleep: 0,
      screenTime: 0,
      workHours: 0,
      meals: 0,
      exercise: 0,
      focusTime: 0,
      breaks: 0,
      socialTime: 0,
      mood: 5,
      energy: 5,
      productivity: 5,
      stress: 5,
      notes: ''
    }));
  };

  const handleDeleteEntry = (entryId) => {
    const updatedBehaviors = behaviors.filter(entry => entry.id !== entryId);
    setBehaviors(updatedBehaviors);
    localStorage.setItem("behaviors", JSON.stringify(updatedBehaviors));
  };

  const generateSuggestions = async () => {
    // Your existing AI suggestion logic
    try {
      const enhancedPersona = {
        ...persona,
        productivityMetrics: metrics,
        recentBehaviors: behaviors.slice(-7),
        currentTasks: tasks.filter(t => !t.done).length,
        completedTasks: tasks.filter(t => t.done).length
      };
      
      // Replace with your actual AI call
      const res = await getSuggestions(enhancedPersona);
      setAiSuggestions(res);
      localStorage.setItem("aiSuggestions", JSON.stringify(res));
    } catch (error) {
      console.error('Error generating suggestions:', error);
      setAiSuggestions("Sorry, couldn't generate suggestions at this time. Please try again later.");
    }
  };

  const clearSuggestions = () => {
    setAiSuggestions(null);
    localStorage.removeItem("aiSuggestions");
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };



  // Handle tasks update
  const handleTasksUpdate = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("userTasks", JSON.stringify(updatedTasks));
  };

  if (!persona) {
    // Redirect to landing page if no persona is found
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hello, {persona?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600 text-lg">Your Digital Twin Productivity Dashboard</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="/calendar" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
              <Calendar size={18} />
              Calendar
            </a>
            <a href="/setup" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium">
              <User size={18} />
              Setup Profile
            </a>
            <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              <User size={18} />
              Home
            </a>
          </div>
        </div>

        {/* Navigation */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                  icon={Target}
                  title="Productivity"
                  value={`${metrics.avgProductivity || 'N/A'}/10`}
                  subtitle="Average"
                  color="blue"
                  trend={metrics.productivityTrend}
                />
                <MetricCard
                  icon={Moon}
                  title="Sleep"
                  value={`${metrics.avgSleep || 'N/A'}h`}
                  subtitle="Average/night"
                  color="purple"
                />
                <MetricCard
                  icon={Clock}
                  title="Work"
                  value={`${metrics.avgWorkHours || 'N/A'}h`}
                  subtitle="Average/day"
                  color="green"
                />
                <MetricCard
                  icon={Calendar}
                  title="Streak"
                  value={metrics.streakDays || 0}
                  subtitle="Days"
                  color="orange"
                />
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                  icon={Coffee}
                  title="Mood"
                  value={`${metrics.avgMood || 'N/A'}/10`}
                  subtitle="Average"
                  color="pink"
                  trend={metrics.moodTrend}
                />
                <MetricCard
                  icon={Zap}
                  title="Energy"
                  value={`${metrics.avgEnergy || 'N/A'}/10`}
                  subtitle="Average"
                  color="yellow"
                />
                <MetricCard
                  icon={Target}
                  title="Focus Time"
                  value={`${metrics.avgFocusTime || 'N/A'}h`}
                  subtitle="Average/day"
                  color="indigo"
                />
                <MetricCard
                  icon={TrendingUp}
                  title="Exercise"
                  value={`${metrics.avgExercise || 'N/A'}h`}
                  subtitle="Average/day"
                  color="emerald"
                />
              </div>

              {/* Charts */}
              <ProductivityChart behaviors={behaviors} />
              <BehaviorRadarChart behaviors={behaviors} metrics={metrics} />
              
              {/* Recommendations */}
              {metrics.recommendations && metrics.recommendations.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Personalized Recommendations</h3>
                  <div className="space-y-3">
                    {metrics.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <DigitalTwin mood={twinMood} metrics={metrics} />
              <SmartNotifications 
                notifications={notifications} 
                onDismiss={dismissNotification} 
              />
            </div>
          </div>
        )}

        {/* Behavior Log Tab */}
        {activeTab === 'behavior' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BehaviorEntryForm
              currentEntry={currentEntry}
              setCurrentEntry={setCurrentEntry}
              onAddEntry={handleAddEntry}
            />
            
            {/* Recent Entries */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Entries</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {behaviors.slice(-10).reverse().map((entry) => (
                  <div key={entry.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="font-medium text-gray-800">
                          {new Date(entry.date).toLocaleDateString('en', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <div className="flex gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            entry.productivity >= 8 ? 'bg-green-100 text-green-800' :
                            entry.productivity >= 6 ? 'bg-blue-100 text-blue-800' :
                            entry.productivity >= 4 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            Prod: {entry.productivity}/10
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            entry.mood >= 8 ? 'bg-green-100 text-green-800' :
                            entry.mood >= 6 ? 'bg-blue-100 text-blue-800' :
                            entry.mood >= 4 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            Mood: {entry.mood}/10
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="Delete entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                      <div>Sleep: {entry.sleep}h</div>
                      <div>Work: {entry.workHours}h</div>
                      <div>Screen: {entry.screenTime}h</div>
                      <div>Exercise: {entry.exercise}h</div>
                      {entry.focusTime > 0 && <div>Focus: {entry.focusTime}h</div>}
                      {entry.socialTime > 0 && <div>Social: {entry.socialTime}h</div>}
                    </div>
                    
                    {entry.notes && (
                      <div className="text-xs text-gray-500 mt-2 p-2 bg-white rounded border">
                        <span className="font-medium">Notes:</span> {entry.notes}
                      </div>
                    )}
                  </div>
                ))}
                {behaviors.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No entries yet. Start logging your daily behaviors!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tasks & Focus Tab */}
        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TaskManager tasks={tasks} setTasks={handleTasksUpdate} />
            <FocusTimer />
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-2">AI-Powered Insights</h2>
              <p>Powered by Cohere AI • Personalized recommendations based on your digital twin data</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIInsightsPanel
                aiSuggestions={aiSuggestions}
                onGenerate={generateSuggestions}
                onClear={clearSuggestions}
              />
              
              {/* Productivity Analysis */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Total Entries</span>
                    <span className="text-blue-600 font-bold">{behaviors.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Avg Productivity</span>
                    <span className="text-green-600 font-bold">{metrics.avgProductivity || 'N/A'}/10</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Tasks Completed</span>
                    <span className="text-purple-600 font-bold">{tasks.filter(t => t.done).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;