import { useEffect, useState } from "react";
import api from "../api/api";

export default function Booking() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/routes");
      setRoutes(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load routes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 style={{ background: 'linear-gradient(to right, #ec4899, #9333ea, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} className="text-5xl font-extrabold mb-3">
          Book a Bus
        </h1>
        <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Select your preferred route</p>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border-4 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300 px-6 py-4 rounded-xl mb-6 font-bold text-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-xl font-semibold">Loading routes...</p>
        </div>
      ) : routes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl text-center border-4 border-purple-600 dark:border-purple-500 transition-colors duration-300">
          <p className="text-gray-600 dark:text-gray-300 text-xl mb-3 font-bold">No routes available at the moment.</p>
          <p className="text-base text-gray-500 dark:text-gray-400">Please check back later or contact support.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {routes.map((route, index) => {
            const gradients = [
              'linear-gradient(to right, #ec4899, #f43f5e)',
              'linear-gradient(to right, #9333ea, #6366f1)',
              'linear-gradient(to right, #3b82f6, #06b6d4)',
              'linear-gradient(to right, #6366f1, #9333ea)',
              'linear-gradient(to right, #f43f5e, #ec4899)',
            ];
            const gradient = gradients[index % gradients.length];
            return (
              <div
                key={route.id}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-4 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all transform hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedRoute(selectedRoute?.id === route.id ? null : route)}
              >
                <div className="h-4 rounded-t-3xl -m-8 mb-6" style={{ background: gradient }}></div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">
                      {route.routeName}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                        <span className="font-bold text-blue-800 dark:text-blue-300">From:</span>
                        <span className="ml-2 text-blue-700 dark:text-blue-300 font-semibold">{route.startLocation}</span>
                      </div>
                      <span className="text-3xl font-bold" style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>→</span>
                      <div className="flex items-center px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                        <span className="font-bold text-purple-800 dark:text-purple-300">To:</span>
                        <span className="ml-2 text-purple-700 dark:text-purple-300 font-semibold">{route.endLocation}</span>
                      </div>
                    </div>
                  </div>
                  <button style={{ background: gradient }} className="hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-110 shadow-xl ml-4 text-lg">
                    Select
                  </button>
                </div>

                {selectedRoute?.id === route.id && (
                  <div className="mt-8 pt-8 border-t-4 border-gray-200 dark:border-gray-700">
                    <div className="p-8 rounded-3xl border-4 bg-purple-50 dark:bg-purple-900/20 border-purple-600 dark:border-purple-500">
                      <h4 className="font-extrabold text-gray-800 dark:text-gray-200 mb-4 text-2xl">Booking Details</h4>
                      <p className="text-base text-gray-700 dark:text-gray-300 mb-6 font-semibold">
                        Route: <span className="font-bold text-purple-700 dark:text-purple-400">{route.startLocation}</span> → <span className="font-bold text-purple-700 dark:text-purple-400">{route.endLocation}</span>
                      </p>
                      <button style={{ background: gradient }} className="w-full hover:opacity-90 text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-xl text-lg">
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
