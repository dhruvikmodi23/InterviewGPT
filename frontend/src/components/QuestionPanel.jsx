import { useEffect, useState } from 'react';
import { FaLightbulb, FaCode, FaClock } from 'react-icons/fa';
import DifficultyBadge from './DifficultyBadge';

const QuestionPanel = ({ question }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Mock function to simulate getting question details
  const getQuestionDetails = () => {
    if (!question) return null;
    
    return {
      description: `Given an array of integers ${question.title === 'Two Sum' ? 'nums' : 'values'} and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        }
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ],
      hints: [
        'A really brute force way would be to search for all possible pairs of numbers.',
        'Use a hash table to reduce the lookup time from O(n) to O(1).'
      ]
    };
  };

  const questionDetails = getQuestionDetails();

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!question || !questionDetails) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-800">{question.title}</h2>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <div className="flex items-center mr-4">
          <FaClock className="mr-1" />
          <span>{formatTime(timeElapsed)}</span>
        </div>
        <div className="flex items-center">
          <FaCode className="mr-1" />
          <span className="capitalize">{question.category}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Description</h3>
        <p className="text-gray-600 whitespace-pre-line">{questionDetails.description}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">Examples</h3>
        {questionDetails.examples.map((example, index) => (
          <div key={index} className="mb-3 bg-gray-50 p-3 rounded-md">
            <div className="font-mono text-sm">
              <div className="text-gray-600">Input: {example.input}</div>
              <div className="text-gray-600">Output: {example.output}</div>
              {example.explanation && (
                <div className="text-gray-500 mt-1">Explanation: {example.explanation}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="text-primary-500 hover:text-primary-600 text-sm font-medium mb-4 self-start"
        >
          Show more details...
        </button>
      )}

      {isExpanded && (
        <>
          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Constraints</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {questionDetails.constraints.map((constraint, index) => (
                <li key={index} className="font-mono text-sm">{constraint}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2 flex items-center">
              <FaLightbulb className="mr-1 text-yellow-500" />
              Hints
            </h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-1">
              {questionDetails.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ol>
          </div>

          <button
            onClick={() => setIsExpanded(false)}
            className="text-primary-500 hover:text-primary-600 text-sm font-medium mb-2 self-start"
          >
            Show less
          </button>
        </>
      )}

      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Tip: Explain your thought process as you code.</p>
          <p>We'll evaluate both your solution and communication skills.</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;