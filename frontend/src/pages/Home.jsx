import MapView from "../components/MapView";

export default function Home() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          <span style={{ background: 'linear-gradient(to right, #2563eb, #9333ea, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Live Bus Tracking
          </span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">Track buses in real-time across the city</p>
      </div>

      <div className="mt-8 h-[500px] rounded-3xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 border-4 border-purple-600 dark:border-purple-500">
        <MapView />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }} className="p-8 rounded-3xl text-white shadow-2xl transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold mb-3">Real-Time Updates</h3>
          <p className="text-blue-100 text-lg">Get instant location updates of all buses</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #9333ea, #7e22ce)' }} className="p-8 rounded-3xl text-white shadow-2xl transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold mb-3">Easy Booking</h3>
          <p className="text-purple-100 text-lg">Book your seat with just a few clicks</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }} className="p-8 rounded-3xl text-white shadow-2xl transform hover:scale-105 transition-transform">
          <h3 className="text-2xl font-bold mb-3">Route Planning</h3>
          <p className="text-pink-100 text-lg">Find the best route for your journey</p>
        </div>
      </div>
    </div>
  );
}
