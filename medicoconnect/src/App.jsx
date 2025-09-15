import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DoctorSearch from './pages/DoctorSearch';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import LogoutButton from './components/LogoutButton';
import MapView from './components/MapView';
import ChatBot from './pages/Chatbox';
import HealthJourney from './components/HealthJourney';
import BookAppointment from './pages/BookAppointment';

function App() {
  const location = useLocation();
  return (
    <div className='font-sans'>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/search" element={<DoctorSearch />} /> 
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/mapview" element={<MapView />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/healthjourney" element={<HealthJourney />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
