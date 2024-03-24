import React from "react";

const FollowUpList = ({ followUps, userType }) => {
  return (
    <div className="flex flex-col items-center h-full overflow-y-auto">
      {followUps.map((followUp, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 my-4 w-3/4 relative"
        >
          <h3 className="text-lg font-semibold mb-2">{followUp.title}</h3>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Follow-up Date:</span>{" "}
            {followUp.follow_up_date}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Type:</span> {followUp.type}
          </div>
          <p className="text-gray-600 mb-2">{followUp.notes}</p>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Communication Method:</span>{" "}
            {followUp.communication_method}
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

export default FollowUpList;
