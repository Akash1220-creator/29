import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    countryCode: '+91',
  });
  const [showCountryCode, setShowCountryCode] = useState(false);

  // A simplified list of country codes for the dropdown
  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryCodeSelect = (code) => {
    setFormData((prevData) => ({
      ...prevData,
      countryCode: code,
    }));
    setShowCountryCode(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form submitted with data:', formData);
    alert("Form submitted. Check the console for data.");
  };
  
  // Custom alert/modal instead of window.alert()
  const [alert, setAlert] = useState(null);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 3000); // Alert disappears after 3 seconds
  };
  

  return (
    <>
      {/* Custom Alert/Modal UI */}
      {alert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[900]">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm text-center">
            <p className="text-gray-800 text-lg">{alert}</p>
            <button
              onClick={() => setAlert(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Main Enquiry Form Container */}
      <div className="fixed right-0 bottom-0 z-[870] w-80 rounded-tl-lg bg-[#14a6df] p-3 pt-16 shadow-lg">
        <h3 className="text-xl font-bold text-white text-center">Apply Now</h3>
        <div className="enq-form-info mt-4 rounded-lg bg-white p-4">
          <div className="rounded-lg border border-gray-200">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 p-3 text-sm font-semibold rounded-tl-lg focus:outline-none transition-colors duration-200 ${
                  activeTab === 'register' ? 'bg-white text-[#14a6df] border-b-2 border-transparent -mb-[1px] relative z-10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                Register
              </button>
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 p-3 text-sm font-semibold rounded-tr-lg focus:outline-none transition-colors duration-200 ${
                  activeTab === 'login' ? 'bg-white text-[#14a6df] border-b-2 border-transparent -mb-[1px] relative z-10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                Login
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content p-4">
              {activeTab === 'register' && (
                <div className="tab-pane">
                  <form onSubmit={handleFormSubmit}>
                    {/* Candidate Name */}
                    <div className="mb-4">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a6df]"
                        placeholder="Candidate Name *"
                        required
                      />
                    </div>
                    {/* Candidate Email */}
                    <div className="mb-4">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a6df]"
                        placeholder="Candidate Email Address *"
                        required
                      />
                    </div>
                    {/* Mobile Number with Country Code Dropdown */}
                    <div className="mb-4 relative">
                      <div className="flex items-center">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowCountryCode(!showCountryCode)}
                            className="bg-gray-200 text-gray-700 rounded-l-md px-3 py-2 border border-r-0 focus:outline-none"
                          >
                            {formData.countryCode} <span className="ml-1 caret">▼</span>
                          </button>
                          {showCountryCode && (
                            <ul className="absolute z-50 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto left-0 mt-1 w-48">
                              {countryCodes.map((c) => (
                                <li
                                  key={c.code}
                                  onClick={() => handleCountryCodeSelect(c.code)}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                  {c.country} ({c.code})
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#14a6df]"
                          placeholder="Mobile Number *"
                          required
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="w-full bg-[#14a6df] text-white py-3 rounded-full font-semibold hover:bg-[#118fbb] transition duration-300"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {activeTab === 'login' && (
                <div className="tab-pane">
                  <form onSubmit={handleFormSubmit}>
                    {/* Login Form (simplified) */}
                    <div className="mb-4">
                      <input
                        type="email"
                        name="loginEmail"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a6df]"
                        placeholder="Email *"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        name="loginPassword"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#14a6df]"
                        placeholder="Password *"
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="w-full bg-[#14a6df] text-white py-3 rounded-full font-semibold hover:bg-[#118fbb] transition duration-300"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
