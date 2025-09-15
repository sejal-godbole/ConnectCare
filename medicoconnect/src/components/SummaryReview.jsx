import React, { useRef } from "react";
import { healthStops } from "../data/healthStops";
import html2pdf from "html2pdf.js"; // ✅ import

const SummaryReview = ({ answers }) => {
  const pdfRef = useRef(); // ✅ reference to the content

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0.5,
      filename: "MediConnect_Health_Summary.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-green-700">🧾 Your Health Summary</h1>

      {/* PDF content container */}
      <div ref={pdfRef} className="w-full max-w-2xl space-y-4 bg-white p-6 rounded-xl shadow-md">
        {healthStops.map((stop) => (
          <div
            key={stop.id}
            className="border-l-4 border-green-500 pl-4 pb-3 pt-2"
          >
            <h3 className="font-semibold text-lg">
              {stop.title} -{" "}
              <span className="text-gray-600">{stop.question}</span>
            </h3>
            <p className="text-gray-800 mt-1">
              {Array.isArray(answers[stop.id])
                ? answers[stop.id].join(", ")
                : answers[stop.id] || "Not answered"}
            </p>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex gap-4">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-xl"
          onClick={() => alert("🧠 Data submitted (simulate Firebase here)!")}
        >
          Submit to MediConnect
        </button>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-xl"
          onClick={handleDownloadPDF}
        >
          📄 Download PDF
        </button>
      </div>
    </div>
  );
};

export default SummaryReview;
