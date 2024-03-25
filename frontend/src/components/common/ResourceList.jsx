const ResourceList = ({ resources, userType }) => {
  return (
    <div className="flex flex-col items-center h-full overflow-y-auto">
      {resources.map((resource, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 my-4 w-3/4 relative"
        >
          <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
          <p className="text-gray-600 mb-2">{resource.description}</p>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Type:</span> {resource.type}
          </div>
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mb-2"
          >
            {resource.link}
          </a>
          <div className="text-sm text-gray-500 mb-2">
            <span className="font-semibold">Issues:</span>{" "}
            {resource.issues.join(", ")}
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
export default ResourceList;
