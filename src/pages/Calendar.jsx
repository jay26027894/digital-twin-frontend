import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Calendar as CalendarIcon, CheckCircle, Target, Zap, TrendingUp, Plus, Edit3, Trash2 } from 'lucide-react';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState({ tasks: [], habits: [] });
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newHabit, setNewHabit] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [monthlyStats, setMonthlyStats] = useState({ 
    totalTasks: 0, 
    completedTasks: 0, 
    habitStreak: 0,
    productiveDays: 0
  });

  useEffect(() => {
    fetchDataForDate(date);
    calculateMonthlyStats();
  }, [date]);

  const fetchDataForDate = async (selectedDate) => {
    setLoading(true);
    try {
      const formatted = selectedDate.toISOString().split("T")[0];
      const res = await fetch(`http://localhost:5000/api/entries/${formatted}`);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("Error fetching date-based entries:", err);
      // Fallback to localStorage for demo purposes
      const stored = localStorage.getItem(`entries-${selectedDate.toISOString().split("T")[0]}`);
      if (stored) {
        setEntries(JSON.parse(stored));
      } else {
        setEntries({ tasks: [], habits: [] });
      }
    }
    setLoading(false);
  };

  const calculateMonthlyStats = () => {
    // This would typically fetch from your API
    // For now, calculating from localStorage as demo
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    let totalTasks = 0;
    let completedTasks = 0;
    let productiveDays = 0;

    // Sample calculation - replace with actual API call
    for (let day = 1; day <= 31; day++) {
      const checkDate = new Date(currentYear, currentMonth, day);
      const key = `entries-${checkDate.toISOString().split("T")[0]}`;
      const dayData = localStorage.getItem(key);
      if (dayData) {
        const parsed = JSON.parse(dayData);
        totalTasks += parsed.tasks ? parsed.tasks.length : 0;
        if (parsed.tasks && parsed.tasks.length > 0) {
          productiveDays++;
        }
      }
    }

    setMonthlyStats({
      totalTasks,
      completedTasks: Math.floor(totalTasks * 0.7), // Demo value
      habitStreak: 12, // Demo value
      productiveDays
    });
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    
    try {
      const formatted = date.toISOString().split("T")[0];
      const updatedTasks = [...entries.tasks, newTask];
      
      // API call would go here
      // await fetch(`http://localhost:5000/api/entries/${formatted}/tasks`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ task: newTask })
      // });

      // Fallback to localStorage
      const updatedEntries = { ...entries, tasks: updatedTasks };
      setEntries(updatedEntries);
      localStorage.setItem(`entries-${formatted}`, JSON.stringify(updatedEntries));
      
      setNewTask('');
      setShowAddTask(false);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const addHabit = async () => {
    if (!newHabit.trim()) return;
    
    try {
      const formatted = date.toISOString().split("T")[0];
      const updatedHabits = [...entries.habits, newHabit];
      
      // API call would go here
      const updatedEntries = { ...entries, habits: updatedHabits };
      setEntries(updatedEntries);
      localStorage.setItem(`entries-${formatted}`, JSON.stringify(updatedEntries));
      
      setNewHabit('');
      setShowAddHabit(false);
    } catch (err) {
      console.error("Error adding habit:", err);
    }
  };

  const removeTask = (index) => {
    const updatedTasks = entries.tasks.filter((_, i) => i !== index);
    const updatedEntries = { ...entries, tasks: updatedTasks };
    setEntries(updatedEntries);
    
    const formatted = date.toISOString().split("T")[0];
    localStorage.setItem(`entries-${formatted}`, JSON.stringify(updatedEntries));
  };

  const removeHabit = (index) => {
    const updatedHabits = entries.habits.filter((_, i) => i !== index);
    const updatedEntries = { ...entries, habits: updatedHabits };
    setEntries(updatedEntries);
    
    const formatted = date.toISOString().split("T")[0];
    localStorage.setItem(`entries-${formatted}`, JSON.stringify(updatedEntries));
  };

  const tileContent = ({ date: tileDate, view }) => {
    if (view === 'month') {
      const formatted = tileDate.toISOString().split("T")[0];
      const dayData = localStorage.getItem(`entries-${formatted}`);
      
      if (dayData) {
        const parsed = JSON.parse(dayData);
        const hasData = (parsed.tasks && parsed.tasks.length > 0) || (parsed.habits && parsed.habits.length > 0);
        
        if (hasData) {
          return (
            <div className="flex justify-center items-center mt-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          );
        }
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📅 Calendar View</h1>
          <p className="text-gray-600 text-lg">Track your daily progress and productivity patterns</p>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-blue-500" size={20} />
              <span className="text-sm text-gray-600">Total Tasks</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{monthlyStats.totalTasks}</div>
            <div className="text-sm text-gray-500">This month</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-green-500" size={20} />
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{monthlyStats.completedTasks}</div>
            <div className="text-sm text-gray-500">
              {monthlyStats.totalTasks > 0 ? Math.round((monthlyStats.completedTasks / monthlyStats.totalTasks) * 100) : 0}% rate
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-orange-500" size={20} />
              <span className="text-sm text-gray-600">Habit Streak</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{monthlyStats.habitStreak}</div>
            <div className="text-sm text-gray-500">Days</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-purple-500" size={20} />
              <span className="text-sm text-gray-600">Productive Days</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{monthlyStats.productiveDays}</div>
            <div className="text-sm text-gray-500">This month</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="text-blue-500" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Calendar</h2>
            </div>
            
            <div className="calendar-container">
              <Calendar
                onChange={setDate}
                value={date}
                tileContent={tileContent}
                className="custom-calendar"
              />
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Days with entries are marked with a blue dot
              </p>
            </div>
          </div>

          {/* Entries Section */}
          <div className="space-y-6">
            {/* Selected Date Info */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">
                {date.toLocaleDateString('en', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
              <p className="text-blue-100">
                {entries.tasks.length + entries.habits.length} total entries
              </p>
            </div>

            {/* Tasks Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="text-blue-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Tasks</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {entries.tasks.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowAddTask(!showAddTask)}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Plus size={16} />
                  <span className="text-sm">Add Task</span>
                </button>
              </div>

              {showAddTask && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Enter new task..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    />
                    <button
                      onClick={addTask}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : entries.tasks.length ? (
                <div className="space-y-2">
                  {entries.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-gray-700">{task}</span>
                      </div>
                      <button
                        onClick={() => removeTask(idx)}
                        className="text-red-500 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="mx-auto text-gray-300 mb-2" size={48} />
                  <p className="text-gray-500">No tasks for this day</p>
                  <p className="text-gray-400 text-sm">Click "Add Task" to get started</p>
                </div>
              )}
            </div>

            {/* Habits Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="text-orange-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Habits</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    {entries.habits.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowAddHabit(!showAddHabit)}
                  className="flex items-center gap-1 text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <Plus size={16} />
                  <span className="text-sm">Add Habit</span>
                </button>
              </div>

              {showAddHabit && (
                <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newHabit}
                      onChange={(e) => setNewHabit(e.target.value)}
                      placeholder="Enter new habit..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                    />
                    <button
                      onClick={addHabit}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : entries.habits.length ? (
                <div className="space-y-2">
                  {entries.habits.map((habit, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Zap className="text-orange-500" size={16} />
                        <span className="text-gray-700">{habit}</span>
                      </div>
                      <button
                        onClick={() => removeHabit(idx)}
                        className="text-red-500 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Zap className="mx-auto text-gray-300 mb-2" size={48} />
                  <p className="text-gray-500">No habits tracked for this day</p>
                  <p className="text-gray-400 text-sm">Click "Add Habit" to start tracking</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-calendar {
          width: 100%;
          border: none;
          background: transparent;
        }
        
        .custom-calendar .react-calendar__tile {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin: 2px;
          padding: 8px 4px;
          transition: all 0.2s ease;
        }
        
        .custom-calendar .react-calendar__tile:hover {
          background: #e0e7ff;
          border-color: #3b82f6;
        }
        
        .custom-calendar .react-calendar__tile--active {
          background: #3b82f6 !important;
          color: white;
          border-color: #3b82f6;
        }
        
        .custom-calendar .react-calendar__tile--now {
          background: #fef3c7;
          border-color: #f59e0b;
        }
        
        .custom-calendar .react-calendar__navigation button {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          color: #475569;
          margin: 2px;
          padding: 8px 12px;
          transition: all 0.2s ease;
        }
        
        .custom-calendar .react-calendar__navigation button:hover {
          background: #e2e8f0;
          border-color: #94a3b8;
        }
        
        .custom-calendar .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.75rem;
          color: #64748b;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;