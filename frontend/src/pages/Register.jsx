import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Passenger",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md border-4 border-pink-500 dark:border-pink-400 transition-colors duration-300"
      >
        <div className="text-center mb-8">
          <h2 style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} className="text-4xl font-extrabold mb-3">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Join us today!</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border-4 border-red-300 dark:border-red-600 text-red-800 dark:text-red-300 px-4 py-3 rounded-xl mb-6 font-semibold">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <input
            name="username"
            className="w-full p-4 border-4 rounded-xl transition-all outline-none focus:border-pink-500 dark:focus:border-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            className="w-full p-4 border-4 rounded-xl transition-all outline-none focus:border-pink-500 dark:focus:border-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            className="w-full p-4 border-4 rounded-xl transition-all outline-none focus:border-pink-500 dark:focus:border-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full p-4 border-4 rounded-xl transition-all outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-pink-500 dark:focus:border-pink-400"
            value={form.role}
            onChange={handleChange}
          >
            <option value="Passenger">Passenger</option>
            <option value="Driver">Driver</option>
            <option value="Conductor">Conductor</option>
            <option value="Admin">Admin</option>
            <option value="Owner">Owner</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ background: 'linear-gradient(to right, #9333ea, #ec4899)' }}
          className="w-full hover:opacity-90 text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] shadow-xl mt-8 text-lg"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-6 text-gray-700 dark:text-gray-300 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 dark:text-pink-400 font-bold hover:text-pink-800 dark:hover:text-pink-300 hover:underline transition-colors"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
