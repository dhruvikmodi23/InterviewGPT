// src/components/HistoryItem.jsx
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaCode, FaMicrophone, FaStar } from 'react-icons/fa';

const HistoryItem = ({ interview }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              <Link to={`/interview/${interview._id}`} className="hover:text-primary-600">
                {interview.question.title}
              </Link>
            </h3>
            <div className="flex items-center mt-1 space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(interview.question.difficulty)}`}>
                {interview.question.difficulty}
              </span>
              <span className="text-sm text-gray-500">
                {format(new Date(interview.startedAt), 'MMM dd, yyyy - h:mm a')}
              </span>
            </div>
          </div>
          
          {interview.overallScore && (
            <div className={`text-sm px-3 py-1 rounded-full flex items-center ${getScoreColor(interview.overallScore)}`}>
              <FaStar className="mr-1" />
              {interview.overallScore.toFixed(1)}%
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-600 mb-1">
              <FaCode className="mr-2" />
              <span className="text-sm font-medium">Code</span>
            </div>
            <div className="text-sm">
              Passed {interview.codeExecution.testCasesPassed}/{interview.codeExecution.totalTestCases} tests
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {interview.codeExecution.language}
            </div>
          </div>

          {interview.speechAnalysis && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-gray-600 mb-1">
                <FaMicrophone className="mr-2" />
                <span className="text-sm font-medium">Speech</span>
              </div>
              <div className="text-sm">
                Clarity: {interview.speechAnalysis.clarityScore}/100
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {interview.speechAnalysis.fillerWords} filler words
              </div>
            </div>
          )}

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-gray-600 mb-1">Feedback</div>
            <div className="text-sm line-clamp-2">
              {interview.feedback || 'No feedback available'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;