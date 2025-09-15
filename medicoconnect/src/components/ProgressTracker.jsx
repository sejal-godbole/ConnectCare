import React from "react";
import { healthStops } from "../data/healthStops";

const ProgressTracker = ({ currentStep, answers }) => {
  return (
    <div className="flex overflow-x-auto items-center space-x-4 px-2 pb-4 w-full max-w-4xl mx-auto">
      {healthStops.map((stop, index) => {
        const isCompleted = answers[stop.id];
        const isCurrent = index === currentStep;

        return (
          <div key={stop.id} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-4 font-bold transition-all duration-300 ${
                isCurrent
                  ? "bg-blue-600 text-white border-blue-600"
                  : isCompleted
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-gray-200 border-gray-300"
              }`}
            >
              {isCompleted ? "✓" : index + 1}
            </div>
            <p className="text-sm text-center mt-1 whitespace-nowrap max-w-[80px]">
              {stop.title.split(" ")[1]} {/* Only name, not emoji */}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTracker;
