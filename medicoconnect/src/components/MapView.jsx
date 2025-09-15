import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 15);
    }
  }, [coords, map]);
  return null;
};

const MapView = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`✅ Real location: ${latitude}, ${longitude}`);
        setLocation([latitude, longitude]);
      },
      (err) => {
        console.error("❌ Geolocation error:", err.message);
        setError("Permission denied or GPS not available.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  // If there's an error
  if (error) {
    return <p style={{ padding: '1rem', color: 'red' }}>⚠️ {error}</p>;
  }

  // Still loading GPS
  if (!location) {
    return <p style={{ padding: '1rem' }}>📡 Fetching your current location...</p>;
  }

  // Render the map with actual location
  return (
    <div>
      <h2 style={{ padding: "10px 0" }}>📍 You are here</h2>
      <MapContainer center={location} zoom={15} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Popup>
            📍 Your Location<br />
            Lat: {location[0].toFixed(5)}<br />
            Lng: {location[1].toFixed(5)}
          </Popup>
        </Marker>
        <ChangeMapView coords={location} />
      </MapContainer>
    </div>
  );
};

export default MapView;
