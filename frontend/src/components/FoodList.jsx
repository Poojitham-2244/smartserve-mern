import { useEffect, useState } from "react";
import axios from "axios";

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch available food with donor details
    axios.get("http://localhost:5000/api/food")
      .then(res => setFoods(res.data))
      .catch(err => console.log("Error fetching food:", err));
  }, []);

  const handleRequest = async (foodId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/food/request/${foodId}`,
        {},
        { headers: { Authorization: token } }
      );
      alert("Food successfully reserved! 🎊 Please coordinate pickup.");
      setFoods(foods.filter(f => f._id !== foodId));
    } catch (err) {
      alert("Request failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* PAGE HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Available Donations</h1>
          <p className="text-gray-500 max-w-2xl">
            Browse verified food donations from local restaurants and donors. 
            Request pickups instantly.
          </p>
          
          {/* Fake Filter Bar for Visual Appeal */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              All Items ({foods.length})
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 cursor-pointer transition">
              Veg Only
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 cursor-pointer transition">
              Near Me
            </div>
          </div>
        </div>
      </div>

      {/* GRID CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {foods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => (
              <div key={food._id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group overflow-hidden relative">
                
                {/* CARD HEADER (Colored Strip) */}
                <div className={`h-2 w-full ${
                  food.foodType === 'Veg' 
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                }`}></div>

                <div className="p-6 flex-1 flex flex-col">
                  
                  {/* Top Row: Title & Badges */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-2">
                      <h2 className="text-xl font-bold text-gray-900 leading-tight mb-1 group-hover:text-indigo-600 transition">
                        {food.title}
                      </h2>
                      <div className="flex items-center text-xs text-gray-500 font-medium mt-1">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {food.expiryTime} remaining
                      </div>
                    </div>
                    {/* Veg/Non-Veg Icon Badge */}
                    <div className={`p-2 rounded-lg ${
                      food.foodType === 'Veg' 
                        ? 'bg-green-50 text-green-600 border border-green-100' 
                        : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {food.foodType === 'Veg' ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="p-1.5 bg-gray-100 rounded-lg text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Quantity</p>
                        <p className="font-semibold">{food.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="p-1.5 bg-gray-100 rounded-lg text-gray-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Storage</p>
                        <p className="font-semibold">{food.storageMethod}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-5">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {food.location}
                      </p>
                    </div>
                  </div>

                  {/* Donor Section (Pushed to bottom) */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center text-gray-500 text-xs font-bold">
                        {food.donorId?.name?.charAt(0) || "D"}
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-400 font-medium">Donated By</p>
                        <p className="text-sm font-bold text-gray-800 truncate max-w-[120px]">
                          {food.donorId?.name || "Verified Hotel"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Packing Status */}
                    {food.isPacked && (
                      <div className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                        Packed
                      </div>
                    )}
                  </div>
                </div>

                {/* REQUEST BUTTON (Overlay or Bottom) */}
                {userRole === 'ngo' && (
                  <div className="px-6 pb-6 pt-0">
                    <button 
                      onClick={() => handleRequest(food._id)}
                      className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Request Pickup</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // EMPTY STATE
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items available right now</h3>
            <p className="text-gray-500 max-w-md">It looks like all current donations have been requested. Please check back later or contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
}