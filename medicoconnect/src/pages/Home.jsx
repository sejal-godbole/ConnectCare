import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import InfoCard from '../components/InfoCard';

const infoCards = [
  {
    image: "timelyhealthcare.jpeg",
    title: "Problem: Lack of Timely Healthcare Access",
    description: "In emergencies, delays in finding the right medical services or specialists can lead to worsened outcomes, especially in cases like cardiac arrest, trauma, or infections.",
  },
  {
    image: "localhealthcare.avif",
    title: "Problem: Unfamiliarity with Local Healthcare",
    description: "Travelers and relocating individuals often struggle to find the right healthcare services due to lack of centralized and guided information.",
  },
  {
    image: "smartAI.jpg",
    title: "Solution: SmartHealth AI",
    description: "An intelligent healthcare system that uses AI to suggest possible conditions and relevant specialists based on user symptoms, improving response time and care accuracy.",
  },
  {
    image: "appointment.jpg",
    title: "Feature: Appointment & File Sharing",
    description: "Users can book appointments with nearby doctors and upload medical files for remote consultations, enhancing access and efficiency.",
  },
  {
    image: "personalized.png",
    title: "Feature: Secure & Personalized",
    description: "SmartHealth AI ensures data security, delivers personalized recommendations, and enables smooth patient-provider communication via a scalable, accessible platform.",
  },
  {
  image: "nearbydoctors.webp",
  title: "Feature: Find Nearby Doctors Instantly",
  description: "SmartHealth AI helps users quickly locate nearby hospitals, clinics, and specialists using real-time location data, ensuring fast access to the right care when it’s needed most.",
  }

];


const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-[#e9edef] text-gray-800">

      {/* Hero Section */}

    {/* Hero Section - Enhanced */}
    <motion.section
      className="relative flex items-center justify-center min-h-screen w-full bg-cover bg-center px-6 md:pl-24 py-16"
      style={{ backgroundImage: "url('/doctor1.jpg')" }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027]/90 via-[#2c5364]/80 to-[#43cea2]/80 backdrop-blur-[4px]"/>
      <div className="relative z-10 max-w-2xl p-8 flex flex-col items-center text-center animate-fade-in">
        <motion.p className="text-2xl text-[#aee9d1] font-semibold mb-2 tracking-wide drop-shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Your Health Is Your Priority</motion.p>
        <motion.h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-tight" style={{textShadow:'0 0 24px #43cea2, 0 2px 8px #2c5364'}} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>ConnectCare</motion.h1>
        <motion.p className="text-lg mb-8 text-[#e0f7fa] font-medium" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          We will help you to feel better and enjoy every single day of your life.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#2c5364] text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:from-[#185a9d] hover:to-[#43cea2] transition-all duration-200 text-lg border-0"
        >
          Learn More
        </motion.button>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#43cea2" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </div>
    </motion.section>

          {/* Health Journey CTA Section */}

    {/* Health Journey CTA Section - Enhanced */}
    <motion.section
      className="w-full bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#c1f7fa] py-20 px-6 text-center flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#00B8D9] mb-4 drop-shadow-lg">Start Your Health Journey</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg text-[#5B6C78] font-medium">
          Take a guided, interactive journey to better understand your health and get personalized recommendations. Answer a few simple questions and discover your path to wellness!
        </p>
        <motion.button
          whileHover={{ scale: 1.07, backgroundColor: '#00B8D9' }}
          whileTap={{ scale: 0.97 }}
          className="bg-gradient-to-r from-[#00B8D9] to-[#007CC3] hover:from-[#007CC3] hover:to-[#00B8D9] text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-200"
          onClick={() => navigate('/healthJourney')}
        >
          Go to Health Journey
        </motion.button>
      </div>
    </motion.section>


    {/* Info Section */}

      {/* Info Section - Enhanced */}

      <motion.section
        className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-gradient-to-r from-[#f3e8ff] via-[#e0f7fa] to-[#faffd1]  mx-0"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="flex justify-center items-center w-full md:w-1/2 mb-8 md:mb-0">
          <motion.div
            className="relative flex items-center justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <div className="absolute w-64 h-64 bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#80deea] rounded-full blur-2xl opacity-60 z-0" />
            <div className="w-100 h-100 rounded-full border-8 border-[#00B8D9]/30 shadow-xl overflow-hidden relative z-10">
              <img src="/nurseImg.jpg" alt="Nurse" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-4 right-4 bg-white/80 rounded-full p-2 shadow-md z-20">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#00B8D9" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 11V7m0 4v4m0-4H8m4 0h4"/></svg>
            </div>
          </motion.div>
        </div>
        <div className="max-w-xl md:ml-12 flex flex-col items-start">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-[#00B8D9] drop-shadow-lg">We Provide Total Health Care</h2>
          <p className="mb-8 text-[#5B6C78] text-lg font-medium">
            We provide the most full medical services, so every person could have the opportunity to
            receive qualitative medical help. Our experienced doctors and modern equipment make
            sure you get the best treatment possible.
          </p>
          <motion.button
            whileHover={{ scale: 1.07, backgroundColor: '#00B8D9' }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-[#00A69C] to-[#00B8D9] hover:from-[#00B8D9] hover:to-[#00A69C] text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-200 text-lg"
          >
            Get In Touch
          </motion.button>
        </div>
      </motion.section>



      

      {/* Online Consultation */}

    {/* Online Consultation - Enhanced */}
    <motion.section
      className="px-6 md:px-16 py-16 text-center bg-gradient-to-br from-[#faffd1] via-[#e0f7fa] to-[#f3e8ff] flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#007CC3] mb-4 drop-shadow-lg">Get Online Consultation</h2>
        <p className="max-w-2xl mx-auto mb-4 text-gray-900 font-medium">
          Consult with our certified medical professionals online. Receive expert advice,
          prescriptions, and treatment plans from the comfort of your home.
        </p>
        <motion.div
          className="font-semibold text-lg mb-6 text-[#007CC3] flex items-center justify-center gap-2 px-6 py-3"
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#FFA726" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          Call us now: <span className="text-[#FFA726] font-bold">(800) 123 4567</span>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.07, backgroundColor: '#00B8D9' }}
          whileTap={{ scale: 0.97 }}
          className="bg-gradient-to-r from-[#007CC3] to-[#00B8D9] hover:from-[#00B8D9] hover:to-[#007CC3] text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-200 mt-2"
          onClick={() => navigate('/chat')}
        >
          Chat with Doctor
        </motion.button>
      </div>
    </motion.section>


      {/* Info Cards Section */}
      <motion.section
        className="bg-[#f3f8fd] py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
      >
        <h2 className="text-4xl font-bold text-center my-10 text-[#007CC3]">Your Health - Our Smart Solutions</h2>

        <div className="max-w-7xl mx-auto px-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoCards.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
      </motion.section>

    </div>
  );
};

export default Home;
