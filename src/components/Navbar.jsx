import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login" && pathname !== "/register") {
      navigate("/login");
    }
  }, [isAuthenticated, pathname, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + App Name */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl  text-orange-600">🦸🏽‍♀️</span>
            <h1 className="text-xl  text-gray-800">Local Heroes</h1>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`text-gray-700 hover:text-orange-600 font-medium  ${
              pathname === "/"
                ? "bg-orange-100 py-2 px-4 rounded-md  text-orange-700"
                : "hover:bg-gray-100 py-2 px-4 rounded-md text-gray-700"
            }`}
          >
            Heroes
          </Link>
          <Link
            to="/nominate"
            className={`text-gray-700 hover:text-orange-600 font-medium ${
              pathname === "/nominate"
                ? "bg-orange-100 py-2 px-4 rounded-md  text-orange-700"
                : "hover:bg-gray-100 py-2 px-4 rounded-md text-gray-700"
            }`}
          >
            Nominate
          </Link>
        </div>
        {/* Sign In Button */}
        <div className="hidden  md:block">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-medium">
                Hello, {user?.name || user?.username || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 rounded-md transition-colors hover:bg-gray-100 text-gray-700"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-orange-500 text-white px-4 py-2 mx-6 rounded-md hover:bg-orange-600 text-sm">
                  Log In
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-orange-600 text-sm">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger button - visible on small screens */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 group"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded transition-transform duration-300 ease-in-out
              ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded my-1 transition-opacity duration-300 ease-in-out
              ${menuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 rounded transition-transform duration-300 ease-in-out
              ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu - animated open/close */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out px-4 ${
          menuOpen ? "max-h-60 py-4 space-y-2" : "max-h-0 py-0"
        }`}
      >
        <Link
          to="/"
          className="block text-gray-700 hover:text-orange-600 font-medium"
        >
          Heroes
        </Link>
        <Link
          to="/nominate"
          className="block text-gray-700 hover:text-orange-600 font-medium"
        >
          Nominate
        </Link>
        <Link to="/login">
          <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 text-sm mt-2">
            log In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
