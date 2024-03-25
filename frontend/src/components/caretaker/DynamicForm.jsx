// import React, { useState } from "react";

// const DynamicForm = ({ fields, onSubmit }) => {
//   const [formData, setFormData] = useState({});

//   const handleChange = (e, fieldName) => {
//     const value = e.target.value;
//     setFormData((prevData) => ({
//       ...prevData,
//       [fieldName]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full p-6">
//       {fields.map((field, index) => (
//         <div class="grid h-16 place-items-center">
//         <div key={index} className="mb-4 mt-4 w-6/12 content-center">
//           <label  htmlFor={field.name} className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
//             <input
//               type={field.type}
//               id={field.name}
//               value={formData[field.value] || ""}
//               onChange={(e) => handleChange(e, field.name)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           {/* Add more cases for other types like select, checkbox, radio, etc. */}
//         </div>
//         </div>
//       ))}
//      <div class="grid h-16 place-items-center"> <button type="submit">Submit</button> </div>
//     </form>
//   );
// };


import React from "react";

const DynamicForm = ({ fields, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      if (!formDataObject[key]) {
        formDataObject[key] = value;
      } else {
        if (!Array.isArray(formDataObject[key])) {
          formDataObject[key] = [formDataObject[key]];
        }
        formDataObject[key].push(value);
      }
    });
    onSubmit(formDataObject);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 w-8/12 p-6 ml-20 shadow-md border-solid border-2 border-sky-500">
      {fields.map((field, index) => (
        <div class="grid place-items">
        <div key={index} className="mb-4">
          <label htmlFor={field.name} className="block text-sm font-bold mb-2">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              className="w-full px-3 py-2 border rounded-md"
              placeholder={field.placeholder || ""}
              rows={field.rows || 3}
            />
          ): field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              className="w-full px-3 py-2 border rounded-md"
            >
              {field.options.map((option, idx) => (
                <option key={idx} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) :field.type === "link" ? (
            <input
              type="url"
              id={field.name}
              name={field.name}
              className="w-full px-3 py-2 border rounded-md"
              placeholder={field.placeholder || ""}
            />
          ) : field.type === "radio" ? (
            <div>
              {field.options.map((option, idx) => (
                <div key={idx} className="mb-2">
                  <input
                    type="radio"
                    id={`${field.name}-${idx}`}
                    name={field.name}
                    value={option.value}
                    className="mr-2"
                  />
                  <label htmlFor={`${field.name}-${idx}`}>{option.label}</label>
                </div>
              ))}
            </div>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              className="w-full px-3 py-2 border rounded-md"
              placeholder={field.placeholder || ""}
            />
          )}
        </div>
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;

