import React from 'react';
import Navbar from '../components/Navbar';

function Login() {
  return (
    <div>
      <Navbar />
      <br />
      <br />

      <div className="flex flex-col items-center">
        <br />
        <h1 className="text-2xl font-bold text-center text-secondaryBlueColor sm:text-3xl sm:px-6 sm:py-6">
          Login
        </h1>
        <br />
        <h2>Email</h2>
        <input
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <h2>Password</h2>
        <input
          type="text"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <br />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Login
        </button>
        <br />
      </div>
    </div>
  );
}

export default Login;
