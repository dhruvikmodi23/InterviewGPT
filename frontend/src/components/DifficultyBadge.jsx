const DifficultyBadge = ({ difficulty }) => {
    const getDifficultyStyles = () => {
      switch (difficulty.toLowerCase()) {
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
  
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyStyles()}`}>
        {difficulty}
      </span>
    );
  };
  
  export default DifficultyBadge;