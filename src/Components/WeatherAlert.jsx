import React, { useEffect, useState } from "react";
import "../CSS/WeatherAlert.css";
import { LuCloudRain } from "react-icons/lu";
import { useSelector } from "react-redux";

const WeatherAlert = () => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!token) return;
    const fetchWeather = async () => {
      try {
        const res = await fetch(`${BaseUrl}/farmerDash/farmDash`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.data.weatherAlert?.hasAlert) {
          setWeather(data.data.weatherAlert);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchWeather();
  }, [token]);

  if (!weather) return null;

  return (
    <div className="weather-alert-container">
      <div className="weather-alert-card">
        <div className="weather-icon-section">
          <LuCloudRain className="weather-alert-icon" />
        </div>
        <div className="weather-text-section">
          <h2>{weather.title}</h2>
          <p>{weather.message}</p>
          {weather.temperature && (
            <span className="weather-temp">{weather.temperature}°C — {weather.description}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherAlert;