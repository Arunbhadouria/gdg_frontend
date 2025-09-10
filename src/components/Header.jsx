import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Run only once when component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Listen for login/logout events from other components
    const handleLoginChange = () => {
      const updatedStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(updatedStatus);
    };

    window.addEventListener("loginStatusChange", handleLoginChange);
    window.addEventListener("storage", handleLoginChange);

    return () => {
      window.removeEventListener("loginStatusChange", handleLoginChange);
      window.removeEventListener("storage", handleLoginChange);
    };
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);

    // Dispatch event to notify other components
    window.dispatchEvent(new Event("loginStatusChange"));

    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Google Developer Group"
              className="h-10 w-14"
            />
            <span className="font-bold text-2xl text-gray-800">
              Google Developer Groups
            </span>
          </Link>
        </div>

        <nav className="flex items-center space-x-6">
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            About GDG
          </Link>
          <Link
            to="/events"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Upcoming Events
          </Link>

          {!isLoggedIn ? (
            <button
              onClick={handleLoginClick}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              Log in
            </button>
          ) : (
            <button
              onClick={handleLogoutClick}
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
            >
              Log out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
