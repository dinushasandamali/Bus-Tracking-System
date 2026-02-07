import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid username or password. Please check your credentials.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-12">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md border-4 border-purple-600 dark:border-purple-500 transition-colors duration-300"
      >
        <div className="text-center mb-8">
          <h2 style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} className="text-4xl font-extrabold mb-3">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border-4 border-red-300 dark:border-red-600 text-red-800 dark:text-red-300 px-4 py-3 rounded-xl mb-6 font-semibold">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <input
              className="w-full p-4 border-4 rounded-xl transition-all outline-none focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full p-4 border-4 rounded-xl transition-all outline-none focus:border-purple-500 dark:focus:border-purple-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button 
          style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)' }}
          className="w-full hover:opacity-90 text-white py-4 rounded-xl font-bold mt-8 shadow-xl transition-all transform hover:scale-[1.02] text-lg"
        >
          Login
        </button>

        <p className="text-center text-sm mt-6 text-gray-700 dark:text-gray-300 font-medium">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 dark:text-purple-400 font-bold hover:text-purple-800 dark:hover:text-purple-300 hover:underline transition-colors"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
