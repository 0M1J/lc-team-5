import React, { useState } from "react";

const DynamicForm = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === "text" && (
            <input
              type="text"
              id={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(e, field.name)}
            />
          )}
          {field.type === "textarea" && (
            <textarea
              id={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(e, field.name)}
            />
          )}
          {/* Add more cases for other types like select, checkbox, radio, etc. */}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
