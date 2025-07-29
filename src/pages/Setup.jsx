import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Target, 
  Clock, 
  Brain, 
  Settings, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Monitor,
  Coffee,
  BookOpen,
  Zap,
  TrendingUp,
  Shield
} from 'lucide-react';

function Setup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    age: "",
    occupation: "",
    
    // Productivity Profile
    productivityType: "",
    workStyle: "",
    workHours: "",
    preferredWorkTime: "",
    
    // Goals & Objectives
    shortTermGoals: "",
    longTermGoals: "",
    primaryFocus: "",
    
    // Tools & Technology
    tools: [],
    devices: [],
    communicationTools: [],
    
    // Habits & Preferences
    sleepSchedule: "",
    exerciseFrequency: "",
    screenTimePreference: "",
    breakPreference: "",
    
    // Challenges & Pain Points
    currentChallenges: "",
    desiredImprovements: "",
    
    // Privacy & Preferences
    dataSharing: "minimal",
    notificationPreferences: "smart",
    themePreference: "auto"
  });

  const steps = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Work Style", icon: Target },
    { id: 3, title: "Goals", icon: Brain },
    { id: 4, title: "Tools", icon: Settings },
    { id: 5, title: "Habits", icon: Clock },
    { id: 6, title: "Preferences", icon: Shield }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Persona:", formData);
    localStorage.setItem("userPersona", JSON.stringify(formData));
    alert("🎉 Your Digital Twin is ready! Welcome to DigiTwin.");
    navigate('/dashboard');
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-600">Let's start with the basics to personalize your experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select age range</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46-55">46-55</option>
                  <option value="55+">55+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Developer, Student, Manager"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Work Style</h2>
              <p className="text-gray-600">Help us understand how you work best</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Productivity Type *</label>
                <select
                  name="productivityType"
                  value={formData.productivityType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select your productivity type</option>
                  <option value="early_bird">Early Bird (Most productive in morning)</option>
                  <option value="night_owl">Night Owl (Most productive in evening)</option>
                  <option value="balanced">Balanced (Consistent throughout day)</option>
                  <option value="burst">Burst Worker (Intense focus periods)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Style</label>
                <select
                  name="workStyle"
                  value={formData.workStyle}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your work style</option>
                  <option value="solo">Solo Worker (Independent)</option>
                  <option value="team">Team Player (Collaborative)</option>
                  <option value="hybrid">Hybrid (Mix of both)</option>
                  <option value="remote">Remote Worker</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Typical Work Hours</label>
                <select
                  name="workHours"
                  value={formData.workHours}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select work hours</option>
                  <option value="4-6">4-6 hours/day</option>
                  <option value="6-8">6-8 hours/day</option>
                  <option value="8-10">8-10 hours/day</option>
                  <option value="10+">10+ hours/day</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Work Time</label>
                <select
                  name="preferredWorkTime"
                  value={formData.preferredWorkTime}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select preferred time</option>
                  <option value="morning">Morning (6 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                  <option value="evening">Evening (6 PM - 12 AM)</option>
                  <option value="flexible">Flexible (Varies)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Goals & Objectives</h2>
              <p className="text-gray-600">What do you want to achieve with DigiTwin?</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Focus Area</label>
                <select
                  name="primaryFocus"
                  value={formData.primaryFocus}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your primary focus</option>
                  <option value="productivity">Improve Productivity</option>
                  <option value="time_management">Better Time Management</option>
                  <option value="work_life_balance">Work-Life Balance</option>
                  <option value="health_habits">Health & Wellness</option>
                  <option value="focus">Improve Focus</option>
                  <option value="stress_reduction">Stress Reduction</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short-term Goals (Next 3 months)</label>
                <textarea
                  name="shortTermGoals"
                  value={formData.shortTermGoals}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="e.g., Reduce screen time by 2 hours, Complete project X, Start exercising 3x/week"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Long-term Goals (Next 6-12 months)</label>
                <textarea
                  name="longTermGoals"
                  value={formData.longTermGoals}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="e.g., Achieve work-life balance, Master time management, Build healthy habits"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Tools & Technology</h2>
              <p className="text-gray-600">What tools do you use in your daily workflow?</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Productivity Tools</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Notion", "Google Calendar", "Trello", "Asana", "Microsoft Office", "Slack", "Discord", "Zoom", "Figma", "GitHub", "Jira", "Monday.com"].map((tool) => (
                    <label key={tool} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="tools"
                        value={tool}
                        onChange={handleChange}
                        checked={formData.tools.includes(tool)}
                        className="mr-3"
                      />
                      {tool}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Devices You Use</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Desktop Computer", "Laptop", "Smartphone", "Tablet", "Smartwatch", "Multiple Monitors"].map((device) => (
                    <label key={device} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="devices"
                        value={device}
                        onChange={handleChange}
                        checked={formData.devices.includes(device)}
                        className="mr-3"
                      />
                      {device}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Communication Tools</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Email", "Slack", "Microsoft Teams", "Discord", "WhatsApp", "Telegram", "Zoom", "Google Meet"].map((tool) => (
                    <label key={tool} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="communicationTools"
                        value={tool}
                        onChange={handleChange}
                        checked={formData.communicationTools.includes(tool)}
                        className="mr-3"
                      />
                      {tool}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Daily Habits & Preferences</h2>
              <p className="text-gray-600">Help us understand your daily routine</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Schedule</label>
                <select
                  name="sleepSchedule"
                  value={formData.sleepSchedule}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your sleep pattern</option>
                  <option value="early_bed">Early to bed, early to rise</option>
                  <option value="late_bed">Late to bed, late to rise</option>
                  <option value="irregular">Irregular sleep schedule</option>
                  <option value="consistent">Consistent 7-8 hours</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Frequency</label>
                <select
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select exercise frequency</option>
                  <option value="daily">Daily</option>
                  <option value="3-4_week">3-4 times per week</option>
                  <option value="1-2_week">1-2 times per week</option>
                  <option value="occasional">Occasionally</option>
                  <option value="none">No regular exercise</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Screen Time Preference</label>
                <select
                  name="screenTimePreference"
                  value={formData.screenTimePreference}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your preference</option>
                  <option value="minimal">Minimal (2-4 hours/day)</option>
                  <option value="moderate">Moderate (4-6 hours/day)</option>
                  <option value="high">High (6-8 hours/day)</option>
                  <option value="very_high">Very High (8+ hours/day)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Break Preference</label>
                <select
                  name="breakPreference"
                  value={formData.breakPreference}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select break style</option>
                  <option value="pomodoro">Pomodoro (25min work, 5min break)</option>
                  <option value="hourly">Hourly breaks</option>
                  <option value="flexible">Flexible breaks</option>
                  <option value="minimal">Minimal breaks</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Final Preferences</h2>
              <p className="text-gray-600">Customize your DigiTwin experience</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Challenges</label>
                <textarea
                  name="currentChallenges"
                  value={formData.currentChallenges}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="What are your biggest productivity challenges? (e.g., procrastination, distractions, time management)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desired Improvements</label>
                <textarea
                  name="desiredImprovements"
                  value={formData.desiredImprovements}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="What specific improvements would you like to see? (e.g., better focus, more energy, work-life balance)"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Sharing</label>
                  <select
                    name="dataSharing"
                    value={formData.dataSharing}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="minimal">Minimal (Essential only)</option>
                    <option value="standard">Standard (Analytics)</option>
                    <option value="comprehensive">Comprehensive (Full insights)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notifications</label>
                  <select
                    name="notificationPreferences"
                    value={formData.notificationPreferences}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="smart">Smart (AI-powered)</option>
                    <option value="minimal">Minimal</option>
                    <option value="frequent">Frequent</option>
                    <option value="none">None</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    name="themePreference"
                    value={formData.themePreference}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="auto">Auto (System)</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">DigiTwin Setup</span>
          </div>
          <p className="text-gray-600">Let's create your personalized digital twin</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {steps.length}</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / steps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-medium"
                >
                  Create My Digital Twin
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Your data is secure and will only be used to personalize your experience.</p>
        </div>
      </div>
    </div>
  );
}

export default Setup;
