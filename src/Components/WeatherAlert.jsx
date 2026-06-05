import React from "react";
import "../CSS/WeatherAlert.css";
import { LuCloudRain } from "react-icons/lu";

const WeatherAlert = () => {
  return (
    <div className="weather-alert-container">
      <div className="weather-alert-card">
        <div className="weather-icon-section">
          <LuCloudRain className="weather-alert-icon" />
        </div>
        <div className="weather-text-section">
          <h2>Weather Alert: Heavy Rain Expected</h2>
          <p>Heavy rainfall expected in Lagos area tomorrow. Consider delaying transport of perishable produce or ensure proper protection.</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlert;