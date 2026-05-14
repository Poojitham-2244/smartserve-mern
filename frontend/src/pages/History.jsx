import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [items, setItems] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, [token]);

  const fetchHistory = () => {
    axios.get("http://localhost:5000/api/food/history", {
      headers: { Authorization: token }
    })
    .then(res => setItems(res.data))
    .catch(err => console.log(err));
  };

  const handleComplaint = async (foodId) => {
    const reason = prompt("Describe problem with this food (e.g., Spoiled, Wrong quantity):");
    if (!reason) return;

    try {
      await axios.post("http://localhost:5000/api/complaints", 
        { foodId, reason }, 
        { headers: { Authorization: token } }
      );
      alert("Complaint submitted to Admin.");
    } catch (err) {
      console.error(err);
      alert("Error submitting complaint.");
    }
  };

  // Determine styling and text for status
  const getStatusBadge = (item) => {
    let label = item.status;
    let colorClass = "";
    
    if (item.status === 'available' && !item.isAdminApproved) {
      label = "Pending Approval";
      colorClass = "bg-amber-100 text-amber-700 border-amber-200 shadow-amber-200/50";
    } else if (item.status === 'available' && item.isAdminApproved) {
      label = "Live Listing";
      colorClass = "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-emerald-200/50";
    } else if (item.status === 'Accepted') {
      label = "Collected";
      colorClass = "bg-blue-100 text-blue-700 border-blue-200 shadow-blue-200/50";
    } else {
      colorClass = "bg-gray-100 text-gray-700 border-gray-200";
    }

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm ${colorClass}`}>
        {label}
      </span>
    );
  };

  // Helper for Card Border/Shadow Color
  const getCardStyles = (item) => {
    if (item.status === 'Accepted') return "ring-1 ring-blue-100 shadow-blue-500/10";
    if (item.status === 'available' && !item.isAdminApproved) return "ring-1 ring-amber-100 shadow-amber-500/10";
    return "ring-1 ring-emerald-100 shadow-emerald-500/10";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
      
      {/* --- GLASSMORPHISM HEADER --- */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Back Button */}
          <button 
            onClick={() => nav('/dashboard')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-transform hover:-translate-x-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>

          {/* Title */}
          <h1 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Activity History
          </h1>
          
          {/* Spacer */}
          <div className="w-32"></div> 
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {items.length > 0 ? (
          <div className="space-y-6">
            {items.map((item, index) => (
              <div 
                key={item._id} 
                className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${getCardStyles(item)}`}
              >
                {/* CARD HEADER */}
                <div className="p-6 border-b border-gray-100/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs font-medium">
                      <svg className="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {getStatusBadge(item)}
                  </div>
                </div>

                {/* CARD BODY */}
                <div className="p-6 space-y-4">
                  
                  {/* INFO GRID - Soft Colors */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm text-indigo-500">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Quantity</p>
                        <p className="text-sm font-semibold text-gray-800">{item.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-teal-50/50 rounded-xl border border-teal-100/50">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm text-teal-500">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Type</p>
                        <p className="text-sm font-semibold text-gray-800">{item.foodType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-xl border border-purple-100/50">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm text-purple-500">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Location</p>
                        <p className="text-sm font-semibold text-gray-800 truncate max-w-[80px]">{item.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* USER INFO SECTION - Highlighted */}
                  <div className="bg-gradient-to-r from-indigo-50 to-white p-4 rounded-xl border border-indigo-100 flex items-center gap-4 shadow-inner">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white">
                      {role === 'donor' 
                        ? item.requestedBy?.name?.charAt(0) || "?" 
                        : item.donorId?.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                        {role === 'donor' ? 'Recipient (NGO)' : 'Donor'}
                      </p>
                      {role === 'donor' ? (
                        item.requestedBy && (item.status === 'Accepted') ? (
                          <p className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                            {item.requestedBy.name}
                            <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded border border-green-200">
                              COMPLETED
                            </span>
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500 italic">
                            {item.isAdminApproved ? "Waiting for collection..." : "Pending approval"}
                          </p>
                        )
                      ) : (
                        <p className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                          {item.donorId?.name || "Unknown Donor"}
                          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded border border-indigo-200">
                            VERIFIED
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* FOOTER ACTION: COMPLAINT */}
                {role === 'ngo' && item.status === 'Accepted' && (
                  <div className="bg-red-50 px-6 py-3 border-t border-red-100 flex justify-end items-center gap-3">
                    <span className="text-xs text-red-600 font-medium">Issue with this order?</span>
                    <button 
                      onClick={() => handleComplaint(item._id)}
                      className="text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      File Complaint
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE - Colorful */
          <div className="flex flex-col items-center justify-center py-32 text-center">
             <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6 text-indigo-400 ring-8 ring-indigo-50">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
             </div>
             <h3 className="text-2xl font-bold text-indigo-900 mb-2">No History Found</h3>
             <p className="text-indigo-500/80 max-w-md">
               Your activity log is empty. Visit dashboard to start donating or accepting food.
             </p>
             <button 
               onClick={() => nav('/dashboard')}
               className="mt-6 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-indigo-300"
             >
               Go to Dashboard
             </button>
          </div>
        )}
      </div>
    </div>
  );
}