
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + App Name */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-orange-600">🦸🏽‍♀️</span>
          <h1 className="text-xl font-semibold text-gray-800">Local Heroes</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#heroes" className="text-gray-700 hover:text-orange-600 font-medium">Heroes</a>
          <a href="#nominate" className="text-gray-700 hover:text-orange-600 font-medium">Nominate</a>
        </div>

        {/* Sign In Button */}
        <div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 text-sm">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
