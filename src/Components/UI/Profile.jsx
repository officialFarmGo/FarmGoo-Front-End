import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DriversProfile from "../DriversProfile";
import PersonlaProfile from "../PersonlaProfile";

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriverProfile = async () => {
      if (!token) return;
      try {
        const response = await fetch(
          `${BaseUrl}/driverDash/getOneDriver`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
          setProfileData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch driver profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverProfile();
  }, [token, BaseUrl]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #006432",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <DriversProfile profileData={profileData} />
      <PersonlaProfile profileData={profileData} />
    </div>
  );
};

export default Profile;