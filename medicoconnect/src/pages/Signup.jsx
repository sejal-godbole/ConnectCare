// src/pages/Signup.jsx
import React, { useState } from "react";
import {auth, db} from "../firebase/firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"

const Signup = () => {
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        username: userName,
        email: email,
      });

      alert("Signup successful!");
      console.log("user created!", user)
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e3f0fc] to-[#f3e8ff]">
      <div className="flex flex-col items-center justify-center max-w-md mx-auto my-5 bg-white/90 rounded-3xl shadow-2xl p-12 border border-[#43cea2]/30 backdrop-blur-md">
      <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#e3f0fc] drop-shadow-lg">Signup</h2>
      <form onSubmit={handleSignup} className="w-full">
        <input
          type="text"
          className="w-full mb-3 p-3 border-2 border-[#e0f7fa] rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#43cea2] bg-[#e3f0fc] text-[#185a9d] shadow-sm placeholder:text-[#b2dfdb]"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full mb-3 p-3 border-2 border-[#e0f7fa] rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#43cea2] bg-[#faffd1] text-[#185a9d] shadow-sm placeholder:text-[#b2dfdb]"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full mb-3 p-3 border-2 border-[#e0f7fa] rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-[#43cea2] bg-[#faffd1] text-[#185a9d] shadow-sm placeholder:text-[#b2dfdb]"
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
          Sign Up
        </button>
        <button type="button" onClick={() => navigate("/login")} className="w-full bg-gradient-to-r from-[#f06292] to-[#43cea2] text-white py-3 rounded-2xl font-bold shadow-md hover:from-[#43cea2] hover:to-[#f06292] transition-all duration-200">Already has an account</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
    </div>
    
  );
};

export default Signup;
