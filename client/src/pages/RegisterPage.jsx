import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("client");

  async function registerUser(event) {
    event.preventDefault(); // avoid reloading from form
    try{
      await api.post("/register", { // Using the configured api instance instead of axios directly
        name,
        email,
        password,
        userType,
      });
      alert("Registration successful, you can go to login. ");
    } catch (e) {
      alert("Registration failed. Please try again later. ");
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-40 w-full max-w-md">
        <h1 className="text-4xl text-center mb-4 font-bold">Register</h1>
        <form className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md" onSubmit={registerUser}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-3">Select Account Type</label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Client Option */}
              <label 
                className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50
                  ${userType === 'client' 
                    ? 'border-primary bg-red-100 bg-opacity-60' 
                    : 'border-gray-200'}`}
              >
                <input 
                  type="radio" 
                  name="userType" 
                  value="client" 
                  checked={userType === "client"}
                  onChange={(ev) => setUserType(ev.target.value)}
                  className="hidden" 
                />
                <div className="text-primary mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <span className="font-medium text-lg">Client</span>
                <span className="text-sm text-gray-500 text-center mt-2">Browse and book conference rooms</span>
                {userType === 'client' && (
                  <div className="absolute top-2 right-2 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </label>
              
              {/* Host Option */}
              <label 
                className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 relative
                  ${userType === 'host' 
                    ? 'border-primary bg-red-100 bg-opacity-60' 
                    : 'border-gray-200'}`}
              >
                <input 
                  type="radio" 
                  name="userType" 
                  value="host" 
                  checked={userType === "host"}
                  onChange={(ev) => setUserType(ev.target.value)}
                  className="hidden" 
                />
                <div className="text-primary mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
                <span className="font-medium text-lg">Host</span>
                <span className="text-sm text-gray-500 text-center mt-2">Create and manage conference rooms</span>
                {userType === 'host' && (
                  <div className="absolute top-2 right-2 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </label>
            </div>
          </div>
          
          <button className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors font-medium">
            Create Account
          </button>
          
          <div className="text-center py-4 text-gray-500">
            Already a member?{" "}
            <Link className="text-primary font-medium hover:underline" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
