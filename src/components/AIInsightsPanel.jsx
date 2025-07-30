import React, { useState } from 'react';
import { Brain, Sparkles, RefreshCw, X, ChevronDown, ChevronUp } from 'lucide-react';

// Component to format text with markdown-like styling
const FormattedText = ({ text }) => {
  const formatText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Handle headers
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-base font-bold text-gray-800 mt-4 mb-2 first:mt-0">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-lg font-bold text-gray-800 mt-4 mb-2 first:mt-0">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-xl font-bold text-gray-800 mt-4 mb-2 first:mt-0">
            {line.replace('# ', '')}
          </h1>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={index} className="ml-4 mb-2">
            <span className="font-semibold text-purple-700">{line.match(/^\d+\./)[0]}</span>
            <span className="ml-2 text-gray-700">{line.replace(/^\d+\.\s/, '')}</span>
          </div>
        );
      }
      
      // Handle bullet points
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <div key={index} className="ml-4 mb-2 flex items-start">
            <span className="text-purple-500 mr-2 mt-1">•</span>
            <span className="text-gray-700">{line.replace(/^[-•]\s/, '')}</span>
          </div>
        );
      }
      
      // Handle empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2"></div>;
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="text-gray-700 mb-2 leading-relaxed">
          {line}
        </p>
      );
    });
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
    console.log('Raw aiSuggestions:', aiSuggestions); // Debug log
    
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
    
    console.log('Processed text length:', processedText.length); // Debug log
    console.log('Processed text preview:', processedText.substring(0, 200) + '...'); // Debug log
    
    return processedText;
  }, [aiSuggestions]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="text-purple-500" size={20} />
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          <Sparkles size={12} />
          AI Powered
        </div>
      </div>

      {!aiSuggestions ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="text-purple-500" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Get AI-Powered Insights</h3>
          <p className="text-sm text-gray-600 mb-4 max-w-sm mx-auto">
            Generate personalized recommendations based on your productivity patterns and digital twin data
          </p>
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                Analyzing...
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
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-4 border border-purple-200">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Brain className="text-white" size={12} />
              </div>
              <div className="flex-1">
                {/* Content container with conditional height */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'max-h-none' : 'max-h-[300px]'
                }`}>
                  <div className="pr-2">
                    <FormattedText text={suggestionText} />
                  </div>
                </div>
                
                {/* Debug info and Expand/Collapse button */}
                <div className="mt-3 pt-3 border-t border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Content length: {suggestionText.length} characters
                    </div>
                    {suggestionText && suggestionText.length > 500 && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors font-medium"
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
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-between">
            <button
              onClick={onGenerate}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <RefreshCw className="animate-spin" size={16} />
              ) : (
                <RefreshCw size={16} />
              )}
              Refresh Suggestions
            </button>
            
            <button
              onClick={onClear}
              className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <X size={16} />
              Clear
            </button>
          </div>

          {/* Tips */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800 font-medium mb-1">💡 Pro Tip:</p>
            <p className="text-xs text-yellow-700">
              The more data you log, the more personalized and accurate your AI insights become!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightsPanel;