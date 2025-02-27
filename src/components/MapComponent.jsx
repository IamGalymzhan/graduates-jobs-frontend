import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "450px",
  margin: "10px 0px",
  borderRadius: "10px",
};

const center = {
  lat: 25,
  lng: 7,
};

const points = [
  { lat: 51.1694, lng: 71.4491, label: "Astana" },
  { lat: 43.222, lng: 76.8512, label: "Almaty" },
  { lat: 55.7558, lng: 37.6173, label: "Moscow" },
  { lat: 52.2298, lng: 21.0122, label: "Warsaw" },
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 42.3601, lng: -71.0589, label: "Boston" },
  { lat: 43.6517, lng: 51.1975, label: "Aktau" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
  { lat: 48.8566, lng: 2.3522, label: "Paris" },
  { lat: 41.9028, lng: 12.4964, label: "Rome" },
];

const options = {
  disableDefaultUI: true, // Removes all controls
  zoomControl: false, // Removes zoom control
  streetViewControl: false, // Removes street view control
  mapTypeControl: false, // Removes map type switcher
  fullscreenControl: false, // Removes fullscreen button
};

const MapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBXL_ngRPnM69HLfSqGoeoxkFKoKk_BhOA">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        options={options}
      >
        {points.map((point, index) => (
          <Marker key={index} position={point} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
