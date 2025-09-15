import React, { useState } from "react";
import { healthStops } from "../data/healthStops";
import QuestionCard from "./QuestionCard";
import ProgressTracker from "./ProgressTracker";
import SummaryReview from "./SummaryReview";
import TreasureMap from "./TreasureMap"; // ✅ import
import { AnimatePresence } from "framer-motion";

const HealthJourney = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [healthStops[currentStep].id]: value,
    }));
  };

  const goNext = () => {
    if (currentStep < healthStops.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSummary(true);
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  if (showSummary) {
    return <SummaryReview answers={answers} />;
  }

  const stop = healthStops[currentStep];
  const currentAnswer = answers[stop.id];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#faffd1] to-[#f3e8ff] p-6 relative overflow-x-hidden mt-20">
      {/* Floating Icon for Creativity */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <span className="inline-block bg-white/80 rounded-full shadow-lg p-3 border-4 border-blue-300">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v9m0 0H7m5 0h5" />
          </svg>
        </span>
      </div>

      {/* Decorative Header */}
      <div className="mb-8 flex flex-col items-center">
        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#faffd1] drop-shadow-lg animate-fade-in">
          Your Health Adventure
        </div>
        <div className="mt-2 text-lg text-[#43cea2] font-medium tracking-wide animate-fade-in-slow">
          Embark on your personalized journey to wellness
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xl mb-6">
        <div className="h-3 w-full bg-[#e0f7fa] rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#43cea2] via-[#faffd1] to-[#f3e8ff] transition-all duration-500"
            style={{ width: `${((currentStep + 1) / healthStops.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-[#43cea2] mt-1">
          <span>Start</span>
          <span>Finish</span>
        </div>
      </div>

      {/* Main Card with animated glowing border */}
      <div className="w-full max-w-xl relative">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#43cea2] via-[#faffd1] to-[#f3e8ff] blur-xl opacity-70 animate-pulse z-0"></div>
        <div className="relative bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center border-2 border-[#43cea2]/30 backdrop-blur-md animate-fade-in-up z-10">
          {/* Optional: Visual Treasure Map */}
          {/* <TreasureMap currentStep={currentStep} /> */}

          {/* Question Animation */}
          <div className="w-full flex flex-col justify-center items-center min-h-[40vh]">
            <AnimatePresence mode="wait">
              <QuestionCard
                key={stop.id}
                stop={stop}
                answer={currentAnswer}
                onChange={handleAnswerChange}
              />
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 w-full">
            <button
              className={`px-6 py-2 rounded-xl font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#43cea2] ${currentStep === 0 ? 'bg-[#e0f7fa] text-[#b2dfdb] cursor-not-allowed' : 'bg-gradient-to-r from-[#faffd1] to-[#43cea2] text-[#185a9d] hover:from-[#f3e8ff] hover:to-[#43cea2]'}`}
              onClick={goBack}
              disabled={currentStep === 0}
            >
              ⬅ Back
            </button>

            <button
              className="px-6 py-2 rounded-xl font-semibold shadow bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#faffd1] text-white hover:from-[#185a9d] hover:to-[#43cea2] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#43cea2]"
              onClick={goNext}
            >
              {currentStep === healthStops.length - 1 ? "Review" : "Next ➡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthJourney;
