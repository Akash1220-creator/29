import React, { useState } from 'react';
import axios from 'axios';
const App = () => {
  // State for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to toggle between login (true) and sign-up (false) modes
  const [isLoginMode, setIsLoginMode] = useState(true);
  // State for displaying messages to the user (e.g., success, error)
  const [message, setMessage] = useState('');
  // State for loading indicator during form submission
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the submission of the login form.
   * Prevents default form submission behavior.
   * Simulates API calls for login or sign-up based on the current mode.
   * @param {Event} event - The form submission event.
   */
  // Inside your React component (AuthForm or App.js)

const handleSubmit = async (event) => {
  event.preventDefault();
  setMessage('');
  setIsLoading(true);

  if (!email || !password) {
    setMessage('Please enter both email and password.');
    setIsLoading(false);
    return;
  }

  try {
    //const API_URL = import.meta.env.VITE_API_URL;
    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/signup';
    
    const url = `${endpoint}`;//const url = `${API_URL}${endpoint}`;
    console.log('API URL:', url);
    const response = await axios.post(url, { email, password }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
    
    const data =  response.data;
    console.log('API Response:', data);


  if (response.status < 200 || response.status >= 300) {
  throw new Error(data.message || 'An error occurred');
}

    
    console.log('API Response:', data);

    if (isLoginMode) {
      // Handle successful login (e.g., store token in local storage, redirect)
      localStorage.setItem('token', data.token); // Store the JWT
      // Example: history.push('/dashboard');
    } else {
      // After successful sign-up, typically switch to login mode
      setIsLoginMode(true);
    }

    setEmail('');
    setPassword('');

  } catch (error) {
    console.error(`Error during ${isLoginMode ? 'login' : 'sign up'}:`, error.message);
    setMessage(error.message); // Display the error message from the backend or custom error
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLoginMode ? 'Welcome Back!' : 'Join Us Today!'}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {isLoginMode ? 'Sign in to your account.' : 'Create your new account.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {message && (
          <div className={`mt-5 text-center text-sm p-3 rounded-md ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 focus:outline-none"
            disabled={isLoading}
          >
            {isLoginMode ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
