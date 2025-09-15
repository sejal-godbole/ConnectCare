// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton.jsx";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/home")
    } catch (err) {
      setError(err.message);
    }
  };
  const navigate = useNavigate();


  return (
   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e3f0fc] to-[#f3e8ff]">
     <div className="flex flex-col items-center justify-center max-w-md mx-auto my-5 bg-white/90 rounded-3xl shadow-2xl p-12 border border-[#43cea2]/30 backdrop-blur-md">
      <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#e3f0fc] drop-shadow-lg">Login</h2>
      <form onSubmit={handleLogin} className="w-full">
        <input
          type="email"
          className="w-full mb-3 p-3 border-2 border-[#e0f7fa] rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#43cea2] bg-[#e3f0fc] text-[#185a9d] shadow-sm placeholder:text-[#b2dfdb]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full mb-4 p-3 border-2 border-[#e0f7fa] rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#43cea2] bg-[#e3f0fc] text-[#185a9d] shadow-sm placeholder:text-[#b2dfdb]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white py-3 rounded-2xl font-bold shadow-md hover:from-[#185a9d] hover:to-[#43cea2] transition-all duration-200 mb-4">
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full bg-gradient-to-r from-[#f06292] to-[#43cea2] text-white py-3 rounded-2xl font-bold shadow-md hover:from-[#43cea2] hover:to-[#f06292] transition-all duration-200">
          Create an account
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
   </div>
  );
};

export default Login;
