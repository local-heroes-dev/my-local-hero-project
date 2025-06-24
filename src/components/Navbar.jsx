import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + App Name */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-orange-600">🦸🏽‍♀️</span>
          <h1 className="text-xl font-semibold text-gray-800">Local Heroes</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/heroes" className="text-gray-700 hover:text-orange-600 font-medium">Heroes</Link>
          <Link to="/nominate" className="text-gray-700 hover:text-orange-600 font-medium">Nominate</Link>
        </div>

        {/* Sign In Button */}
        <div className="hidden md:block">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 text-sm">
            Sign In
          </button>
        </div>

        {/* Hamburger button - visible on small screens */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 group"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded transition-transform duration-300 ease-in-out
              ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded my-1 transition-opacity duration-300 ease-in-out
              ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded transition-transform duration-300 ease-in-out
              ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu - animated open/close */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out px-4 ${
          menuOpen ? 'max-h-60 py-4 space-y-2' : 'max-h-0 py-0'
        }`}
      >
        <Link to="/heroes" className="block text-gray-700 hover:text-orange-600 font-medium">Heroes</Link>
        <Link to="/nominate" className="block text-gray-700 hover:text-orange-600 font-medium">Nominate</Link>
        <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 text-sm mt-2">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
