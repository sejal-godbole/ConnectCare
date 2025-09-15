import React from "react";


function InfoCard({ image, title, description }) {
  return (
    <div className="bg-white/70 backdrop-blur-lg border border-indigo-100 rounded-2xl overflow-hidden shadow-2xl max-w-sm transition-transform duration-200 hover:scale-105 hover:shadow-indigo-200">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-2xl" />

      {/* Text Section */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-indigo-700 drop-shadow-sm">{title}</h3>
        <p className="text-gray-700 font-medium text-base">{description}</p>
      </div>
    </div>
  );
}

export default InfoCard;
