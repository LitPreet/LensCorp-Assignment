import React from 'react';

const PriorityCard: React.FC = () => {
  return (
    <div className="flex space-x-4 p-4">
      {/* High Priority */}
      <div className="flex items-center">
        <span
          className="w-6 h-6 rounded-full bg-red-500 mr-2"
          title="High Priority"
        ></span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">High Priority</span>
      </div>

      {/* Medium Priority */}
      <div className="flex items-center">
        <span
          className="w-6 h-6 rounded-full bg-orange-500 mr-2"
          title="Medium Priority"
        ></span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Medium Priority</span>
      </div>

      {/* Low Priority */}
      <div className="flex items-center">
        <span
          className="w-6 h-6 rounded-full bg-yellow-500 mr-2"
          title="Low Priority"
        ></span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Low Priority</span>
      </div>
    </div>
  );
};

export default PriorityCard;
