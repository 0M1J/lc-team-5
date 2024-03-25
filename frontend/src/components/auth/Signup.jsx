import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router v6

const SignUp = () => {

  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "resident", // Default user type
  });

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/users/`, formData);
      console.log('Signup successful:', response.data);
      handleLoginClick();
      // Handle successful signup, redirect user, etc.
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email address"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
            required
          />
          <div className="flex items-center space-x-2">
            <input
              id="resident"
              name="role"
              type="radio"
              value="resident"
              checked={formData.role === "resident"}
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              required
            />
            <label htmlFor="resident" className="text-gray-900">
              Resident
            </label>
            <input
              id="caretaker"
              name="role"
              type="radio"
              value="worker"
              checked={formData.role === "worker"}
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              required
            />
            <label htmlFor="caretaker" className="text-gray-900">
              Caretaker
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </form>
        <div className="text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={handleLoginClick}
            className="text-blue-600 hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
