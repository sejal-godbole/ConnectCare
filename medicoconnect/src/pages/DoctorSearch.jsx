import React, { useState } from "react";

// 🗝️ Geoapify API key
const GEOAPIFY_KEY = "7ae563c90ecd437f9a9760c15ab9470e";

const DoctorSearchForm = () => {
  const [locationInput, setLocationInput] = useState("");
  const [healthcareType, setHealthcareType] = useState("healthcare.hospital");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const useMyLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchPlaces(lat, lon);
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  const geocodeLocation = async () => {
    if (!locationInput) return null;
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        locationInput
      )}&apiKey=${GEOAPIFY_KEY}`
    );
    const data = await res.json();
    if (data?.features?.length) {
      const [lon, lat] = data.features[0].geometry.coordinates;
      return { lat, lon };
    }
    return null;
  };

  const fetchPlaces = async (lat, lon) => {
    setLoading(true);
    const radius = 5000;
    const url = `https://api.geoapify.com/v2/places?categories=${healthcareType}&filter=circle:${lon},${lat},${radius}&limit=10&bias=proximity:${lon},${lat}&apiKey=${GEOAPIFY_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setPlaces(data.features || []);
    } catch (error) {
      console.error("Error fetching places:", error);
      alert("Failed to fetch places.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const coords = await geocodeLocation();
    if (!coords) return alert("Could not locate the place.");
    fetchPlaces(coords.lat, coords.lon);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl w-full bg-white shadow p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Find Nearby Healthcare</h2>

        {/* Location input and 📍 button */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Enter Location</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g. Pune, Maharashtra"
            />
            <button
              onClick={useMyLocation}
              className="px-4 bg-gray-300 hover:bg-gray-400 rounded"
            >
              📍
            </button>
          </div>
        </div>

        {/* Healthcare type dropdown */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Type of Healthcare</label>
          <select
            value={healthcareType}
            onChange={(e) => setHealthcareType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="healthcare.hospital">Hospital</option>
            <option value="healthcare.clinic_or_praxis">Clinic</option>
            <option value="healthcare.pharmacy">Pharmacy</option>
            <option value="healthcare.dentist">Dentist</option>
            <option value="healthcare.clinic_or_praxis.gynaecology">Gynaecology</option>
            <option value="healthcare.clinic_or_praxis.cardiology">Cardiology</option>
            <option value="healthcare.clinic_or_praxis.orthopaedics">Orthopaedics</option>
            <option value="healthcare.clinic_or_praxis.paediatrics">Paediatrics</option>
            <option value="healthcare.dentist.orthodontics">Orthodontics</option>
          </select>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Find Nearby Places"}
        </button>

        {/* Results section */}
        <div className="mt-6">
          {places.length > 0 ? (
            places.map((place, index) => {
              const props = place.properties;
              const name = props.name || "Unnamed Facility";
              const lat = place.geometry.coordinates[1];
              const lon = place.geometry.coordinates[0];

              return (
                <div key={index} className="mb-4 p-4 border rounded shadow">
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <p><strong>Address:</strong> {props.formatted || "N/A"}</p>
                  <p><strong>Latitude:</strong> {lat}</p>
                  <p><strong>Longitude:</strong> {lon}</p>

                  {/* Redirect Button */}
                  <button
                    onClick={() =>
                      window.location.href = `/appointment?place=${encodeURIComponent(name)}`
                    }
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Book Appointment
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">
              {loading ? "Searching..." : "No places found."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSearchForm;
