import React, { useState } from 'react';
import { Plus, CheckCircle, X } from 'lucide-react';

const TaskManager = ({ tasks, setTasks, title = "📝 Your Task List" }) => {
  const [taskInput, setTaskInput] = useState("");

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      const updated = [...tasks, { text: taskInput, done: false, id: Date.now() }];
      setTasks(updated);
      setTaskInput("");
    }
  };

  const completedTasks = tasks.filter(t => t.done).length;
  const pendingTasks = tasks.filter(t => !t.done).length;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      
      {/* Add Task Form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add new task..."
          onKeyPress={(e) => e.key === 'Enter' && addTask(e)}
          className="flex-grow px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <button 
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
      
      {/* Task Statistics */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-green-600 font-medium">✅ Completed: {completedTasks}</span>
          <span className="text-orange-600 font-medium">⏳ Pending: {pendingTasks}</span>
          <span className="text-blue-600 font-medium">📊 Total: {tasks.length}</span>
        </div>
        {tasks.length > 0 && (
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedTasks / tasks.length) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-2xl mb-2">📝</div>
            <p>No tasks yet. Add one above to get started!</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id || index}
              className={`flex justify-between items-center p-3 rounded-lg border transition-all duration-200 ${
                task.done 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleTask(index)}
                  className={`transition-colors ${
                    task.done 
                      ? 'text-green-600 hover:text-green-700' 
                      : 'text-gray-400 hover:text-green-600'
                  }`}
                >
                  <CheckCircle size={20} fill={task.done ? 'currentColor' : 'none'} />
                </button>
                <span
                  className={`flex-1 ${
                    task.done 
                      ? "line-through text-gray-400" 
                      : "text-gray-700"
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(index)}
                  className="text-sm text-blue-600 hover:text-blue-700 px-2 py-1 rounded transition-colors"
                >
                  {task.done ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-600 hover:text-red-700 p-1 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;