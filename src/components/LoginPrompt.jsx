import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const LoginPrompt = ({ message = "Please log in to continue", showButtons = true }) => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <LogIn className="w-5 h-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <p className="text-gray-700 font-medium">{message}</p>
          {showButtons && (
            <div className="flex gap-2 mt-2">
              <Link to="/login">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 text-sm font-medium transition-colors">
                  Log In
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm font-medium transition-colors">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt; 