// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#e0f7fa]/80 via-white/80 to-[#f3e8ff]/80 backdrop-blur-md font-bold shadow-lg p-6 flex justify-between items-center border-b border-[#43cea2]/20">
      <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#2c5364] drop-shadow-lg tracking-tight">ConnectCare</Link>
      <div className="space-x-4">
        <Link to="/home" className="text-gray-700 hover:text-[#43cea2] transition-colors duration-150">Home</Link>
        <Link to="/search" className="text-gray-700 hover:text-[#43cea2] transition-colors duration-150">Find Doctors</Link>
        <Link to="/chat" className="text-gray-700 hover:text-[#43cea2] transition-colors duration-150">Chat</Link>
        <Link to="/profile" className="text-gray-700 hover:text-[#43cea2] transition-colors duration-150">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
