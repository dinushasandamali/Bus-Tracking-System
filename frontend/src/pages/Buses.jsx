import { useEffect, useState } from "react";
import api from "../api/api";

export default function Buses() {
  const [buses, setBuses] = useState([]);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/buses");
      setBuses(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load buses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addBus = async (e) => {
    e?.preventDefault();
    if (!registrationNumber || !capacity) {
      setError("Registration number and capacity are required");
      return;
    }

    try {
      setError("");
      await api.post("/buses", {
        registrationNumber,
        capacity: parseInt(capacity),
        description,
      });
      setRegistrationNumber("");
      setCapacity("");
      setDescription("");
      setShowForm(false);
      loadBuses();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add bus");
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 style={{ background: 'linear-gradient(to right, #2563eb, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} className="text-5xl font-extrabold mb-3">
            Bus Management
          </h1>
          <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Manage your fleet of buses</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)' }}
          className="hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-110 shadow-xl text-lg"
        >
          {showForm ? "Cancel" : "+ Add Bus"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border-4 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300 px-6 py-4 rounded-xl mb-6 font-bold text-lg">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl mb-8 border-4 border-purple-600 dark:border-purple-500 transition-colors duration-300">
          <h2 style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} className="text-3xl font-extrabold mb-6">
            Add New Bus
          </h2>
          <form onSubmit={addBus} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Registration Number *
              </label>
              <input
                type="text"
                placeholder="e.g., ABC-1234"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-purple-500 dark:focus:border-purple-400 transition-all outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Capacity *
              </label>
              <input
                type="number"
                placeholder="e.g., 50"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-purple-500 dark:focus:border-purple-400 transition-all outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <input
                type="text"
                placeholder="Optional description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-purple-500 dark:focus:border-purple-400 transition-all outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              style={{ background: 'linear-gradient(to right, #2563eb, #9333ea)' }}
              className="w-full hover:opacity-90 text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-xl text-lg"
            >
              Add Bus
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Loading buses...</p>
        </div>
      ) : buses.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-xl border-2 border-purple-100 dark:border-purple-900/50 text-center transition-colors duration-300">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No buses found.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Add your first bus above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buses.map((bus, index) => {
            const gradients = [
              'linear-gradient(to right, #3b82f6, #06b6d4)',
              'linear-gradient(to right, #9333ea, #ec4899)',
              'linear-gradient(to right, #ec4899, #f43f5e)',
              'linear-gradient(to right, #6366f1, #9333ea)',
              'linear-gradient(to right, #06b6d4, #3b82f6)',
              'linear-gradient(to right, #8b5cf6, #9333ea)',
            ];
            const gradient = gradients[index % gradients.length];
            return (
              <div
                key={bus.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border-4 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="h-3 rounded-t-3xl -m-6 mb-4" style={{ background: gradient }}></div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">
                    {bus.registrationNumber}
                  </h3>
                  <span style={{ background: gradient }} className="text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                    {bus.capacity} seats
                  </span>
                </div>
                {bus.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-base mb-4 font-medium">{bus.description}</p>
                )}
                <div className="mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">ID: {bus.id.slice(0, 8)}...</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
