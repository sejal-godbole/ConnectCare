import React from "react";
import { motion } from "framer-motion"; // ✅ import motion

const QuestionCard = ({ stop, answer, onChange }) => {
  return (
    <motion.div
      key={stop.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="bg-white/90 p-8 rounded-3xl shadow-xl w-full max-w-xl mx-auto border border-[#43cea2]/30 backdrop-blur-md"
    >
      <h2 className="text-3xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#faffd1] drop-shadow-lg">{stop.title}</h2>
      <p className="text-lg mb-6 text-[#185a9d] font-medium">{stop.question}</p>

      {/* Question Type Inputs */}
      {stop.type === "yesno" && (
        <div className="flex gap-6 justify-center">
          {["Yes", "No"].map((val) => (
            <button
              key={val}
              className={`px-8 py-3 rounded-2xl font-bold shadow-md transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-[#43cea2] border-2 ${
                answer === val
                  ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white border-[#43cea2] scale-105"
                  : "bg-[#f3e8ff] text-[#185a9d] border-[#e0f7fa] hover:bg-gradient-to-r hover:from-[#faffd1] hover:to-[#43cea2] hover:text-[#185a9d]"
              }`}
              onClick={() => onChange(val)}
            >
              {val}
            </button>
          ))}
        </div>
      )}

      {stop.type === "checkbox" && (
        <div className="flex flex-wrap gap-3 justify-center">
          {stop.options.map((opt) => (
            <label
              key={opt}
              className={`px-5 py-2 rounded-2xl border-2 cursor-pointer font-semibold text-base shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#43cea2] ${
                answer?.includes(opt)
                  ? "bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white border-[#43cea2] scale-105"
                  : "bg-[#f3e8ff] text-[#185a9d] border-[#e0f7fa] hover:bg-gradient-to-r hover:from-[#faffd1] hover:to-[#43cea2] hover:text-[#185a9d]"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={answer?.includes(opt)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...(answer || []), opt]);
                  } else {
                    onChange(answer.filter((a) => a !== opt));
                  }
                }}
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {stop.type === "input" && (
        <input
          type="text"
          placeholder={stop.placeholder}
          className="w-full border-2 border-[#e0f7fa] rounded-2xl p-3 mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#43cea2] bg-[#faffd1] text-[#185a9d] shadow-sm placeholder:text-[#b2dfdb]"
          value={answer || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </motion.div>
  );
};

export default QuestionCard;
