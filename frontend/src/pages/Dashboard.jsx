import { useNavigate } from "react-router-dom";
import AddFood from "../components/AddFood";

export default function Dashboard() {
  const nav = useNavigate();
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName") || "User";

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">
      
      {/* --- SIDEBAR (White & Clean) --- */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex shadow-sm z-20">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">SmartServe</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-6">
          {/* Active Link */}
          <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </div>

          <div onClick={() => nav("/history")} className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition cursor-pointer font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>History</span>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={logout} 
            className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA (Light Gray) --- */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* HEADER BAR (White & Shadow) */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Overview</p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <button className="relative text-gray-400 hover:text-gray-600 transition">
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Profile Pill */}
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full pr-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{userName}</p>
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{role}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 border border-white shadow-sm flex items-center justify-center text-xs font-bold text-white">
                {userName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Good Morning, {userName} 👋</h1>
            <p className="text-gray-500">Here's what's happening today.</p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Stat 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <h3 className="text-xl font-bold text-gray-900">Active</h3>
              </div>
            </div>

             {/* Stat 2 */}
             <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <h3 className="text-xl font-bold capitalize text-gray-900">{role}</h3>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <h3 className="text-xl font-bold text-gray-900">{new Date().toLocaleDateString()}</h3>
              </div>
            </div>
          </div>

          {/* DYNAMIC CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ADMIN */}
            {role === 'admin' && (
              <div className="lg:col-span-1 lg:col-start-2">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-md text-center relative overflow-hidden">
                  {/* Decor */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                  
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h2>
                  <p className="text-gray-500 mb-8">Verify posts and manage reports.</p>
                  <button 
                    onClick={() => nav("/admin")} 
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition shadow-lg"
                  >
                    Go to Admin
                  </button>
                </div>
              </div>
            )}

            {/* DONOR */}
            {role === 'donor' && (
              <>
                <div className="lg:col-span-2">
                  <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-1">
                    <div className="bg-gray-50 p-6 rounded-[20px]">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">New Donation</h2>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-inner">
                         <AddFood />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white border border-gray-200 rounded-3xl p-6 h-full shadow-sm flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">My Activity</h2>
                    <div className="space-y-4 flex-1">
                        {/* Mock History Item */}
                        <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                           <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">✓</div>
                           <div>
                             <p className="font-bold text-gray-900">Rice & Curry</p>
                             <p className="text-xs text-gray-500">Completed • 2h ago</p>
                           </div>
                        </div>
                    </div>
                    <button onClick={() => nav("/history")} className="w-full mt-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition">
                       View History
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* NGO */}
            {role === 'ngo' && (
              <>
                {/* Main Feature Card */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="relative z-10 max-w-md">
                      <h2 className="text-3xl font-bold mb-4">Find Food</h2>
                      <p className="text-blue-100 mb-8 text-lg">Browse available donations from donors in your area and request pickups instantly.</p>
                      <button 
                        onClick={() => nav("/foods")} 
                        className="bg-white text-blue-700 font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition"
                      >
                        Browse Listings
                      </button>
                    </div>
                  </div>
                </div>

                {/* Side Activity Card */}
                <div className="lg:col-span-1">
                  <div className="bg-white border border-gray-200 rounded-3xl p-6 h-full shadow-sm flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">My Requests</h2>
                    
                    <div className="space-y-4 mb-6">
                       <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                         <div>
                           <p className="font-bold text-gray-900">Vegetable Pack</p>
                           <p className="text-xs font-bold text-yellow-600">Pending</p>
                         </div>
                       </div>
                       <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                         <div>
                           <p className="font-bold text-gray-900">Canned Goods</p>
                           <p className="text-xs font-bold text-green-600">Accepted</p>
                         </div>
                       </div>
                    </div>

                    <button onClick={() => nav("/history")} className="w-full mt-auto py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition">
                       View All History
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>

        </main>
      </div>
    </div>
  );
}