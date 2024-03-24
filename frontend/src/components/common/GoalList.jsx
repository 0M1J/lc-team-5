import React from "react";

const GoalList = ({ goals, userType }) => {
  return (
    <div className="flex flex-col items-center h-full overflow-y-auto">
      {goals.map((goal, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 my-4 w-3/4 relative"
        >
          <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
          <p className="text-gray-600 mb-2">{goal.description}</p>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <span className="font-semibold">Term:</span> {goal.term}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold">Status:</span> {goal.status}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{goal.means}</p>
          <div className="flex mt-2">
            {goal.health_aspect.map((aspect, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-600 rounded-full py-1 px-2 text-xs mr-2"
              >
                {aspect}
              </div>
            ))}
          </div>
          {userType === "0" && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Modify
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default GoalList;
