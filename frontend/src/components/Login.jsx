import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [data, setData] = useState({});
  const nav = useNavigate();

  // --- FUNCTIONALITY KEPT EXACTLY THE SAME ---
  const login = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, data);
      
      // Store both for global access
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); 
      localStorage.setItem("userName", res.data.name);

      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    // CHANGED: Background to Blue/Indigo Gradient
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-4">
      
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-white/20 transform transition-all hover:scale-[1.01]">
        
        {/* Header Section with Icon */}
        <div className="text-center mb-8">
          {/* CHANGED: Logo background to Indigo */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-400 shadow-lg mb-4 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">SmartServe</h2>
          <p className="text-gray-500 text-sm mt-2 font-medium">Welcome back, please login to continue</p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-5">
          
          {/* Email Input Group */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {/* CHANGED: Icon color on focus to Indigo */}
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input 
              type="email" 
              placeholder="Email Address" 
              // CHANGED: Focus ring color to Indigo
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700 font-medium"
              onChange={(e) => setData({ ...data, email: e.target.value })} 
            />
          </div>

          {/* Password Input Group */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {/* CHANGED: Icon color on focus to Indigo */}
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              // CHANGED: Focus ring color to Indigo
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700 font-medium"
              onChange={(e) => setData({ ...data, password: e.target.value })} 
            />
          </div>

          {/* Login Button */}
          <button 
            onClick={login} 
            // CHANGED: Button to Indigo/Blue gradient + Shadow color
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 transform transition-all active:scale-95"
          >
            Sign In
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            {/* CHANGED: Link color to Blue */}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-2 decoration-2 hover:decoration-blue-500 transition-all">
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}