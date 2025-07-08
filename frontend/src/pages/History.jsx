import { useState, useEffect } from 'react';
import { getInterviewHistory } from '../api/interviews';
import HistoryItem from '../components/HistoryItem';
import LoadingSpinner from '../components/LoadingSpinner';

const History = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await getInterviewHistory();
        setInterviews(data.interviews);
      } catch (err) {
        setError('Failed to fetch interview history. Please try again later.');
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Interview History</h1>
      
      {interviews.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-8 rounded text-center">
          No interview history found. Start your first interview to see results here.
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <HistoryItem key={interview._id} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
