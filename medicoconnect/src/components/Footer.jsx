import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#faffd1] text-gray-700 border-t border-[#43cea2]/20 rounded-t-3xl  shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#2c5364] drop-shadow-lg">ConnectCare</h2>
          <p className="text-sm text-gray-600 mt-2">
            Connecting you with the right care, instantly. Your health, our priority.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#185a9d]">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#43cea2] transition-colors duration-150">Home</Link></li>
            <li><Link to="/search" className="hover:text-[#43cea2] transition-colors duration-150">Find Doctors</Link></li>
            <li><Link to="/login" className="hover:text-[#43cea2] transition-colors duration-150">Login</Link></li>
            <li><Link to="/signup" className="hover:text-[#43cea2] transition-colors duration-150">Sign Up</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#185a9d]">Follow Us</h3>
          <div className="flex space-x-4 text-gray-600">
            <a href="#" className="hover:text-[#43cea2] transition-colors duration-150"><Facebook size={20} /></a>
            <a href="#" className="hover:text-[#185a9d] transition-colors duration-150"><Twitter size={20} /></a>
            <a href="#" className="hover:text-[#f06292] transition-colors duration-150"><Instagram size={20} /></a>
            <a href="#" className="hover:text-[#2c5364] transition-colors duration-150"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-xs text-gray-400 py-4 border-t border-[#43cea2]/10">
        © {new Date().getFullYear()} ConnectCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
