import React from "react";

const ChronologicalNotesList = ({ chronologicalNotes, userType }) => {
  return (
    <div className="flex flex-col items-center h-full overflow-y-auto">
      {chronologicalNotes.map((note, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 my-4 w-3/4 relative"
        >
          <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Type:</span> {note.type}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Date:</span> {note.date}
          </div>
          <p className="text-gray-600 mb-2">{note.details}</p>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Observations:</span>{" "}
            {note.observations}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Employee:</span> {note.employee}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Follow-up Type:</span>{" "}
            {note.follow_up_type}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Motive:</span> {note.motive}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Intervention:</span>{" "}
            {note.intervention.join(", ")}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Goal:</span> {note.goal.join(", ")}
          </div>

          <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
            Modify
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChronologicalNotesList;
