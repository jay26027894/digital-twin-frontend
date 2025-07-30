import React, { useState } from 'react';
import { Brain, Sparkles, RefreshCw, X, ChevronDown, ChevronUp, CheckCircle, Target, Clock, Zap } from 'lucide-react';

// Enhanced component to format text with better styling
const FormattedText = ({ text }) => {
  const formatText = (text) => {
    const lines = text.split('\n');
    const formattedElements = [];
    let currentList = [];
    let listType = null;

    const flushList = () => {
      if (currentList.length > 0) {
        if (listType === 'numbered') {
          formattedElements.push(
            <ol key={`list-${formattedElements.length}`} className="list-none space-y-3 my-4">
              {currentList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-400">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.number}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.content}</p>
                  </div>
                </li>
              ))}
            </ol>
          );
        } else if (listType === 'bullet') {
          formattedElements.push(
            <ul key={`list-${formattedElements.length}`} className="space-y-2 my-4">
              {currentList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 p-2">
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      // Handle headers
      if (line.startsWith('### ')) {
        flushList();
        formattedElements.push(
          <h3 key={`h3-${index}`} className="text-lg font-bold text-gray-800 mt-6 mb-3 first:mt-0 flex items-center gap-2">
            <Target className="text-purple-500" size={18} />
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }
      
      if (line.startsWith('## ')) {
        flushList();
        formattedElements.push(
          <h2 key={`h2-${index}`} className="text-xl font-bold text-gray-800 mt-6 mb-3 first:mt-0 flex items-center gap-2">
            <Zap className="text-blue-500" size={20} />
            {line.replace('## ', '')}
          </h2>
        );
        return;
      }
      
      if (line.startsWith('# ')) {
        flushList();
        formattedElements.push(
          <h1 key={`h1-${index}`} className="text-2xl font-bold text-gray-800 mt-6 mb-4 first:mt-0 flex items-center gap-2">
            <Brain className="text-purple-600" size={24} />
            {line.replace('# ', '')}
          </h1>
        );
        return;
      }
      
      // Handle numbered lists with enhanced parsing
      const numberedMatch = line.match(/^(\d+)\.\s*\*\*(.*?)\*\*\s*(.*)/);
      if (numberedMatch) {
        if (listType !== 'numbered') {
          flushList();
          listType = 'numbered';
        }
        currentList.push({
          number: numberedMatch[1],
          title: numberedMatch[2],
          content: numberedMatch[3]
        });
        return;
      }
      
      // Handle simple numbered lists
      if (/^\d+\.\s/.test(line)) {
        if (listType !== 'numbered') {
          flushList();
          listType = 'numbered';
        }
        const match = line.match(/^(\d+)\.\s*(.*)/);
        if (match) {
          currentList.push({
            number: match[1],
            title: match[2].split(':')[0] || match[2],
            content: match[2].includes(':') ? match[2].split(':').slice(1).join(':').trim() : ''
          });
        }
        return;
      }
      
      // Handle bullet points
      if (line.startsWith('- ') || line.startsWith('• ')) {
        if (listType !== 'bullet') {
          flushList();
          listType = 'bullet';
        }
        currentList.push(line.replace(/^[-•]\s/, ''));
        return;
      }
      
      // Handle empty lines
      if (line.trim() === '') {
        flushList();
        if (formattedElements.length > 0) {
          formattedElements.push(<div key={`space-${index}`} className="h-3"></div>);
        }
        return;
      }
      
      // Regular paragraphs
      flushList();
      if (line.trim()) {
        // Check for bold text
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>');
        
        formattedElements.push(
          <p key={`p-${index}`} className="text-gray-700 mb-3 leading-relaxed" 
             dangerouslySetInnerHTML={{ __html: formattedLine }} />
        );
      }
    });

    flushList(); // Flush any remaining list items
    return formattedElements;
  };

  return (
    <div className="text-sm">
      {formatText(text)}
    </div>
  );
};

const AIInsightsPanel = ({ 
  aiSuggestions, 
  onGenerate, 
  onClear, 
  isLoading = false,
  title = "🔮 Personalized AI Suggestions"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Process AI suggestions text with better debugging
  const suggestionText = React.useMemo(() => {
    console.log('Raw aiSuggestions:', aiSuggestions);
    
    if (!aiSuggestions) return '';
    
    let processedText = '';
    
    if (Array.isArray(aiSuggestions)) {
      processedText = aiSuggestions.map((s) => {
        if (typeof s === 'string') return s;
        if (typeof s === 'object') return s.text || s.content || JSON.stringify(s);
        return String(s);
      }).join('\n\n');
    } else if (typeof aiSuggestions === 'object') {
      processedText = aiSuggestions.text || aiSuggestions.content || aiSuggestions.message || JSON.stringify(aiSuggestions);
    } else {
      processedText = String(aiSuggestions);
    }
    
    console.log('Processed text length:', processedText.length);
    
    return processedText;
  }, [aiSuggestions]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Brain className="text-white" size={18} />
          </div>
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-1 text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-medium">
          <Sparkles size={12} />
          AI Powered
        </div>
      </div>

      {!aiSuggestions ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Brain className="text-purple-500" size={28} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Get AI-Powered Insights</h3>
          <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
            Generate personalized recommendations based on your productivity patterns and digital twin data to optimize your daily routine.
          </p>
          
          {isLoading && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center gap-3 mb-2">
                <RefreshCw className="animate-spin text-blue-500" size={16} />
                <span className="text-sm font-medium text-blue-700">Processing your data...</span>
              </div>
              <p className="text-xs text-blue-600">
                Please wait while AI analyzes your patterns and generates personalized suggestions
              </p>
            </div>
          )}
          
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                Analyzing Your Data...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate AI Suggestions
              </>
            )}
          </button>
        </div>
      ) : (
        <div>
          {/* AI Response */}
          <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 p-6 rounded-xl mb-6 border border-purple-200 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <Brain className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Clock className="text-purple-500" size={16} />
                  Your Personalized Action Plan
                </h3>
                
                {/* Content container with conditional height */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? 'max-h-none' : 'max-h-96'
                }`}>
                  <div className="pr-2">
                    <FormattedText text={suggestionText} />
                  </div>
                </div>
                
                {/* Gradient overlay for collapsed state */}
                {!isExpanded && suggestionText && suggestionText.length > 500 && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-purple-50 to-transparent pointer-events-none"></div>
                )}
              </div>
            </div>
            
            {/* Stats and Expand/Collapse button */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-200">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle size={12} className="text-green-500" />
                  {suggestionText.split('\n').filter(line => /^\d+\./.test(line.trim())).length} Actionable Tips
                </span>
                <span>{Math.ceil(suggestionText.length / 1000)} min read</span>
              </div>
              
              {suggestionText && suggestionText.length > 500 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors font-medium bg-white px-3 py-1 rounded-full shadow-sm hover:shadow-md"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp size={16} />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show More
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-between">
            <button
              onClick={onGenerate}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin" size={16} />
              ) : (
                <RefreshCw size={16} />
              )}
              Refresh Insights
            </button>
            
            <button
              onClick={onClear}
              className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 border border-red-200 hover:border-red-300"
            >
              <X size={16} />
              Clear
            </button>
          </div>

          {/* Enhanced Tips */}
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-800 text-sm font-bold">💡</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-800 mb-1">Pro Tip</p>
                <p className="text-sm text-yellow-700 leading-relaxed">
                  The more data you log about your daily activities, sleep patterns, and productivity metrics, 
                  the more personalized and accurate your AI insights become!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightsPanel;