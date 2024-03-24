const InterventionList = ({ interventions, userType }) => {
  return (
    <div className="flex flex-col items-center h-full overflow-y-auto">
      {interventions.map((intervention, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 my-4 w-full max-w-lg"
        >
          <h3 className="text-lg font-semibold mb-2">{intervention.title}</h3>
          <p className="text-gray-600 mb-4">{intervention.description}</p>
          {userType === "0" && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Modify
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InterventionList;
