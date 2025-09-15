import React from "react";
import { healthStops } from "../data/healthStops";
import { FaShip } from "react-icons/fa"; // pirate ship
import { GiBrain, GiHeartOrgan, GiLungs, GiSkeleton } from "react-icons/gi"; // health icons

// Sample positions for the checkpoints (you can fine-tune these)
const positions = [
  { top: "10%", left: "20%", icon: <GiBrain size={28} /> },
  { top: "30%", left: "40%", icon: <GiHeartOrgan size={28} /> },
  { top: "50%", left: "30%", icon: <GiLungs size={28} /> },
  { top: "70%", left: "50%", icon: <GiSkeleton size={28} /> },
  { top: "85%", left: "70%", icon: "☠️" }, // Final stop
];

const TreasureMap = ({ currentStep }) => {
  return (
    <div className="relative w-full h-[600px] bg-yellow-100 border-4 border-yellow-400 rounded-lg shadow-lg overflow-hidden">
      {/* Map background can be image or pattern */}
      <div className="absolute inset-0 bg-[url('/map-texture.jpg')] bg-cover opacity-20" />

      {/* Dashed path — placeholder SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        fill="none"
        stroke="#555"
        strokeWidth="2"
        strokeDasharray="6,6"
      >
        <path d="M150 60 L300 180 L200 300 L400 400 L550 500" />
      </svg>

      {/* Checkpoints */}
      {positions.map((pos, index) => (
        <div
          key={index}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
            index === currentStep ? "z-20" : "z-10"
          }`}
          style={{ top: pos.top, left: pos.left }}
        >
          <div
            className={`rounded-full p-3 border-4 ${
              index === currentStep ? "border-red-500 bg-white" : "border-gray-400 bg-gray-100"
            }`}
          >
            {pos.icon}
          </div>
        </div>
      ))}

      {/* Pirate Ship for current step */}
      {positions[currentStep] && (
        <div
          className="absolute text-red-700 animate-bounce"
          style={{
            top: positions[currentStep].top,
            left: positions[currentStep].left,
            transform: "translate(-50%, -120%)",
          }}
        >
          <FaShip size={24} />
        </div>
      )}

      {/* Compass rose bottom left */}
      <div className="absolute bottom-2 left-2 text-gray-700 text-xl">🧭</div>
    </div>
  );
};

export default TreasureMap;
