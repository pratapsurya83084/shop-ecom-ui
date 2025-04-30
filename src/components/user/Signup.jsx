import React, { useState } from 'react';
import axios from 'axios';
const Signup= () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Handle the form submission here
    console.log(formData);
 // Basic form validation
 if (!formData.name || !formData.email || !formData.password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Send form data to the backend
    const response = await axios.post('http://localhost:1000/api/user/register', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle the response
    console.log('User Registered:', response.data);
    if (response.data.success==true) {
        alert(response.data.message)
        window.location.href="/login"
    }else{
        alert(response.data.message)   
    }
    // You can redirect to a login page or show a success message here
  } catch (error) {
    // Handle error
    console.error('Error registering user:', error);
    alert('Error registering user. Please try again.');
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-xl transform transition-all duration-500 ease-in-out hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Name"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <div className="flex justify-center text-sm text-gray-600">
          <span>Already have an account? </span>
          <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
