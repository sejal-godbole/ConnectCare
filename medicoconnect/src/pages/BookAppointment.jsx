import React, { useState } from "react";

const doctor = {
  name: "Dr. Priya Sharma",
  specialization: "Cardiologist",
  location: "Apollo Hospital, Delhi",
  experience: "12 years",
  photo: "/doctor1.jpg",
  languages: ["English", "Hindi"],
  about:
    "Expert in heart health, preventive care, and patient education. Known for compassionate consultations and evidence-based treatment."
};

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    reason: "",
    date: "",
    slot: "",
    duration: "30 min",
    meetingType: "Zoom",
    zoomLink: "",
    color: "#43cea2",
    notes: ""
  });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDate = (day) => {
    setForm({ ...form, date: `2025-05-${String(day).padStart(2, "0")}` });
  };

  const handleSlot = (slot) => setForm({ ...form, slot });
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/book_appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName: form.patientName,
          patientEmail: form.patientEmail,
          reason: form.reason,
          date: form.date,
          slot: form.slot,
          duration: form.duration,
          meetingType: form.meetingType,
          zoomLink: form.zoomLink,
          notes: form.notes,
          color: form.color,
          doctorName: doctor.name,
          doctorLocation: doctor.location
        })
      });
      const result = await response.json();
      if (response.ok) {
        alert("✅ Appointment booked! A confirmation email has been sent.");
      } else {
        alert("❌ Failed to book appointment: " + result.message);
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("❌ Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#e3f0fc] to-[#f3e8ff] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl border border-[#43cea2]/20 flex flex-col md:flex-row overflow-hidden">
        {/* Doctor Profile Card */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#43cea2]/10 via-[#e3f0fc] to-[#f3e8ff] p-8 flex flex-col items-center justify-center">
          <img src={doctor.photo} alt={doctor.name} className="w-32 h-32 rounded-full object-cover border-4 border-[#43cea2] shadow mb-4" />
          <h3 className="text-xl font-bold text-[#185a9d] mb-1">{doctor.name}</h3>
          <div className="text-[#43cea2] font-semibold mb-1">{doctor.specialization}</div>
          <div className="text-gray-600 mb-1">{doctor.location}</div>
          <div className="text-gray-500 text-sm mb-2">Experience: {doctor.experience}</div>
          <div className="text-gray-500 text-sm mb-2">Languages: {doctor.languages.join(", ")}</div>
          <p className="text-gray-700 text-center text-sm mt-2">{doctor.about}</p>
        </div>

        {/* Booking Form */}
        <div className="md:w-1/2 p-8">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#e3f0fc]">Book Appointment</h2>
              <div className="space-y-4">
                <input name="patientName" value={form.patientName} onChange={handleChange} placeholder="Your Name" className="w-full p-2 border-2 border-[#e0f7fa] rounded-xl bg-[#e3f0fc]" />
                <input name="patientEmail" value={form.patientEmail} onChange={handleChange} placeholder="Email" className="w-full p-2 border-2 border-[#e0f7fa] rounded-xl bg-[#e3f0fc]" />
                <textarea name="reason" value={form.reason} onChange={handleChange} rows={3} placeholder="Reason for visit..." className="w-full p-2 border-2 border-[#e0f7fa] rounded-xl bg-[#e3f0fc]" />
                <select name="duration" value={form.duration} onChange={handleChange} className="w-full p-2 border-2 border-[#e0f7fa] rounded-xl bg-[#e3f0fc]">
                  <option>15 min</option><option>30 min</option><option>45 min</option><option>60 min</option>
                </select>
                <select name="meetingType" value={form.meetingType} onChange={handleChange} className="w-full p-2 border-2 border-[#e0f7fa] rounded-xl bg-[#e3f0fc]">
                  <option>Zoom</option><option>In-person</option><option>Phone Call</option>
                </select>
                {form.meetingType === "Zoom" && (
                  <input name="zoomLink" value={form.zoomLink} onChange={handleChange} placeholder="Zoom Link" className="w-full p-2 border-2 border-[#e0f7fa] rounded-xl bg-[#e3f0fc]" />
                )}
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Additional notes..." className="w-full p-2 border-2 border-[#e0f7fa] rounded-xl bg-[#e3f0fc]" />
                <div className="flex gap-2">{["#43cea2", "#185a9d", "#e91e63", "#3f51b5"].map((c) => (
                  <div key={c} onClick={() => setForm({ ...form, color: c })} className={`w-6 h-6 rounded-full cursor-pointer border-2 ${form.color === c ? "border-black scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
                ))}</div>
              </div>
              <div className="flex justify-end mt-6">
                <button onClick={handleNext} className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white px-6 py-2 rounded-xl font-bold">Next</button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#e3f0fc]">Select Date & Time</h2>
              <div>
                <div className="mb-2 font-semibold">May 2025</div>
                <div className="grid grid-cols-7 gap-1 bg-[#e3f0fc] p-3 rounded-xl">
                  {days.map((d) => (
                    <button key={d} className={`w-9 h-9 rounded-full font-semibold text-sm transition-all ${form.date === `2025-05-${String(d).padStart(2, "0")}` ? 'bg-[#43cea2] text-white scale-110' : 'bg-white text-[#185a9d] hover:bg-[#43cea2]/20'}`} onClick={() => handleDate(d)}>{d}</button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-2 font-semibold">Available Slots</div>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <button key={slot} className={`w-full py-2 rounded-xl font-semibold transition-all border-2 ${form.slot === slot ? 'bg-[#43cea2] text-white border-[#185a9d] scale-105' : 'bg-white text-[#185a9d] border-[#e0f7fa] hover:bg-[#43cea2]/10'}`} onClick={() => handleSlot(slot)}>{slot}</button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={handleBack} className="bg-gray-200 text-[#185a9d] px-6 py-2 rounded-xl font-bold">Back</button>
                <button onClick={handleNext} className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white px-6 py-2 rounded-xl font-bold">Next</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#43cea2] via-[#185a9d] to-[#e3f0fc]">Appointment Summary</h2>
              <div className="bg-[#e3f0fc] rounded-xl p-6 mb-6">
                <div className="mb-2"><span className="font-semibold">Doctor:</span> {doctor.name} ({doctor.specialization})</div>
                <div className="mb-2"><span className="font-semibold">Location:</span> {doctor.location}</div>
                <div className="mb-2"><span className="font-semibold">Patient:</span> {form.patientName} ({form.patientEmail})</div>
                <div className="mb-2"><span className="font-semibold">Reason:</span> {form.reason}</div>
                <div className="mb-2"><span className="font-semibold">Date:</span> {form.date}</div>
                <div className="mb-2"><span className="font-semibold">Time Slot:</span> {form.slot}</div>
                <div className="mb-2"><span className="font-semibold">Duration:</span> {form.duration}</div>
                <div className="mb-2"><span className="font-semibold">Meeting Type:</span> {form.meetingType}</div>
                {form.meetingType === "Zoom" && (
                  <div className="mb-2"><span className="font-semibold">Zoom Link:</span> {form.zoomLink}</div>
                )}
                <div className="mb-2"><span className="font-semibold">Theme Color:</span> <span className="inline-block w-4 h-4 rounded-full ml-2" style={{ backgroundColor: form.color }}></span></div>
                {form.notes && <div className="mb-2"><span className="font-semibold">Notes:</span> {form.notes}</div>}
              </div>
              <div className="flex justify-between">
                <button onClick={handleBack} className="bg-gray-200 text-[#185a9d] px-6 py-2 rounded-xl font-bold">Back</button>
                <button onClick={handleSubmit} className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white px-6 py-2 rounded-xl font-bold">Book Appointment</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
