import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const isLoggedIn = !!localStorage.getItem("token");
  const token = localStorage.getItem("token"); 

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 backdrop-blur-md shadow-2xl border-b-4 border-purple-400 dark:border-purple-600 px-8 py-5 flex justify-between items-center sticky top-0 z-50 transition-colors duration-300">
      <h1 className="text-3xl font-extrabold">
        <span style={{ background: 'linear-gradient(to right, #2563eb, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          BusTrack
        </span>
      </h1>

      <div className="flex items-center space-x-4">
        <Link 
          className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-bold transition-all px-4 py-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 transform hover:scale-110" 
          to="/"
        >
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link 
              className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-bold transition-all px-4 py-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 transform hover:scale-110" 
              to="/booking"
            >
              Booking
            </Link>
            {token && (
              <Link
                className="text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 font-bold transition-all px-4 py-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 transform hover:scale-110"
                to="/buses"
              >
                Buses
              </Link>
            )}
            <button
              onClick={logout}
              style={{ background: 'linear-gradient(to right, #ef4444, #ec4899, #f43f5e)' }}
              className="hover:opacity-90 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-110 shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            style={{ background: 'linear-gradient(to right, #2563eb, #9333ea, #ec4899)' }}
            className="hover:opacity-90 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-110 shadow-lg" 
            to="/login"
          >
            Login
          </Link>
        )}
        
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all transform hover:scale-110"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <span className="text-2xl">☀️</span>
          ) : (
            <span className="text-2xl">🌙</span>
          )}
        </button>
      </div>
    </nav>
  );
}

