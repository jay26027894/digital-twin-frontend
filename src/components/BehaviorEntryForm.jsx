import React from 'react';
import { Plus, Calendar, Trash2 } from 'lucide-react';

const BehaviorEntryForm = ({ currentEntry, setCurrentEntry, onAddEntry, title = "Log Today's Behavior" }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEntry();
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-blue-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={currentEntry.date}
            onChange={(e) => setCurrentEntry({...currentEntry, date: e.target.value})}
            className={inputClass}
          />
        </div>

        {/* Sleep & Screen Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sleep (hours)
              <span className="text-xs text-gray-500 ml-1">0-12</span>
            </label>
            <input
              type="number"
              min="0"
              max="12"
              step="0.5"
              value={currentEntry.sleep}
              onChange={(e) => setCurrentEntry({...currentEntry, sleep: parseFloat(e.target.value) || 0})}
              className={inputClass}
              placeholder="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Screen Time (hours)
              <span className="text-xs text-gray-500 ml-1">0-16</span>
            </label>
            <input
              type="number"
              min="0"
              max="16"
              step="0.5"
              value={currentEntry.screenTime}
              onChange={(e) => setCurrentEntry({...currentEntry, screenTime: parseFloat(e.target.value) || 0})}
              className={inputClass}
              placeholder="0"
            />
          </div>
        </div>

        {/* Work & Meals */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Hours
              <span className="text-xs text-gray-500 ml-1">0-16</span>
            </label>
            <input
              type="number"
              min="0"
              max="16"
              step="0.5"
              value={currentEntry.workHours}
              onChange={(e) => setCurrentEntry({...currentEntry, workHours: parseFloat(e.target.value) || 0})}
              className={inputClass}
              placeholder="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meals
              <span className="text-xs text-gray-500 ml-1">0-6</span>
            </label>
            <input
              type="number"
              min="0"
              max="6"
              value={currentEntry.meals}
              onChange={(e) => setCurrentEntry({...currentEntry, meals: parseInt(e.target.value) || 0})}
              className={inputClass}
              placeholder="0"
            />
          </div>
        </div>

        {/* Exercise & Focus Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exercise (hours)
              <span className="text-xs text-gray-500 ml-1">0-4</span>
            </label>
            <input
              type="number"
              min="0"
              max="4"
              step="0.5"
              value={currentEntry.exercise}
              onChange={(e) => setCurrentEntry({...currentEntry, exercise: parseFloat(e.target.value) || 0})}
              className={inputClass}
              placeholder="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deep Focus Time (hours)
              <span className="text-xs text-gray-500 ml-1">0-8</span>
            </label>
            <input
              type="number"
              min="0"
              max="8"
              step="0.5"
              value={currentEntry.focusTime || 0}
              onChange={(e) => setCurrentEntry({...currentEntry, focusTime: parseFloat(e.target.value) || 0})}
              className={inputClass}
              placeholder="0"
            />
          </div>
        </div>

        {/* Breaks & Social Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Breaks Taken
              <span className="text-xs text-gray-500 ml-1">0-20</span>
            </label>
            <input
              type="number"
              min="0"
              max="20"
              value={currentEntry.breaks || 0}
              onChange={(e) => setCurrentEntry({...currentEntry, breaks: parseInt(e.target.value) || 0})}
              className={inputClass}
              placeholder="0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Social Time (hours)
              <span className="text-xs text-gray-500 ml-1">0-8</span>
            </label>
            <input
              type="number"
              min="0"
              max="8"
              step="0.5"
              value={currentEntry.socialTime || 0}
              onChange={(e) => setCurrentEntry({...currentEntry, socialTime: parseFloat(e.target.value) || 0})}
              className={inputClass}
              placeholder="0"
            />
          </div>
        </div>

        {/* Mood & Energy */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mood (1-10)
              <span className="text-xs text-gray-500 ml-1">1=worst, 10=best</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={currentEntry.mood}
              onChange={(e) => setCurrentEntry({...currentEntry, mood: parseInt(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>😢</span>
              <span className="font-medium">{currentEntry.mood}/10</span>
              <span>😊</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Energy Level (1-10)
              <span className="text-xs text-gray-500 ml-1">1=exhausted, 10=energized</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={currentEntry.energy || 5}
              onChange={(e) => setCurrentEntry({...currentEntry, energy: parseInt(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>😴</span>
              <span className="font-medium">{currentEntry.energy || 5}/10</span>
              <span>⚡</span>
            </div>
          </div>
        </div>

        {/* Productivity & Stress */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Productivity Score (1-10)
              <span className="text-xs text-gray-500 ml-1">How productive did you feel?</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={currentEntry.productivity}
              onChange={(e) => setCurrentEntry({...currentEntry, productivity: parseInt(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span className="font-medium">{currentEntry.productivity}/10</span>
              <span>High</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stress Level (1-10)
              <span className="text-xs text-gray-500 ml-1">1=calm, 10=overwhelmed</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={currentEntry.stress || 5}
              onChange={(e) => setCurrentEntry({...currentEntry, stress: parseInt(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>😌</span>
              <span className="font-medium">{currentEntry.stress || 5}/10</span>
              <span>😰</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
            <span className="text-xs text-gray-500 ml-1">Any observations or context</span>
          </label>
          <textarea
            value={currentEntry.notes || ''}
            onChange={(e) => setCurrentEntry({...currentEntry, notes: e.target.value})}
            className={inputClass}
            rows="3"
            placeholder="e.g., Had a great meeting, felt tired after lunch, completed major project..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 justify-center font-medium"
        >
          <Plus size={20} />
          Add Entry
        </button>
        
        {/* Quick Tips */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-2 font-medium">💡 Quick Tips:</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Be honest with your entries for better insights</li>
            <li>• Track consistently for meaningful patterns</li>
            <li>• Use half-hour increments for more accuracy</li>
            <li>• Add notes to capture context and feelings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BehaviorEntryForm;