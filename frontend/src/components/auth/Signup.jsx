import React from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router v6

const SignUp = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <input
            type="email"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Email address"
            required
          />
          <input
            type="password"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
            required
          />
          <div className="flex items-center space-x-2">
            <input
              id="resident"
              name="userType"
              type="radio"
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
              required
            />
            <label htmlFor="resident" className="text-gray-900">
              Resident
            </label>
            <input
              id="caretaker"
              name="userType"
              type="radio"
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
