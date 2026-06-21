import React, { useState } from "react";
import { MdPersonOutline, MdPhone, MdLocationOn } from "react-icons/md";
import { PiPlant } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "../CSS/NewFarm.css";

const NewFarm = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  // Form State matching backend payload keys exactly
  const [formData, setFormData] = useState({
    farmerFullName: "",
    phoneNumber: "",
    farmLocation: "",
    mainProduceType: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Generic handler for input tracking
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // API submission core function
  const handleRegisterFarmer = async (e, shouldNavigateToRequest = false) => {
    if (e) e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const BASE_URL = import.meta.env.VITE_BaseUrl;
    const token = localStorage.getItem("token") || auth?.token;

    if (!BASE_URL) {
      setErrorMessage("API Base URL configuration is missing.");
      setLoading(false);
      return;
    }

    // Basic dynamic field presence validation
    if (
      !formData.farmerFullName ||
      !formData.phoneNumber ||
      !formData.farmLocation ||
      !formData.mainProduceType
    ) {
      setErrorMessage("Please fill out all fields before submitting.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/agent/createAgentFarmer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data) {
        setSuccessMessage("Farmer registered successfully!");

        // Clear out form properties on active success context
        setFormData({
          farmerFullName: "",
          phoneNumber: "",
          farmLocation: "",
          mainProduceType: "",
        });

        // Dynamic multi-action router logic
        if (shouldNavigateToRequest) {
          const createdFarmerId = response.data?.data?._id;
          navigate("/agentDelivery/createRequest", {
            state: { farmerId: createdFarmerId },
          });
        } else {
          setTimeout(() => {
            navigate(-1); // Go back to dashboard panel after short processing window
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Failed to register agent farmer:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An unexpected network layout error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Configuration Array for dynamic map loop iteration
  const formFields = [
    {
      id: "farmerFullName",
      label: "Farmer Full Name",
      type: "text",
      placeholder: "e.g., Chukwu Okafor",
      icon: <MdPersonOutline className="input-icon" />,
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      type: "tel",
      placeholder: "e.g., 09126331487",
      icon: <MdPhone className="input-icon" />,
    },
    {
      id: "farmLocation",
      label: "Farm Location",
      type: "text",
      placeholder: "e.g., Badagry, Lagos State",
      icon: <MdLocationOn className="input-icon" />,
    },
    {
      id: "mainProduceType",
      label: "Main Produce Type",
      type: "text",
      placeholder: "e.g., Tomatoes, Yam, Cassava",
      icon: <PiPlant className="input-icon" />,
    },
  ];

  return (
    <div className="new-farm-container">
      <div className="new-farm-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span className="arrow">←</span> Back to Dashboard
        </button>
        <h1 className="header-title">Add New Farmer</h1>
        <p className="header-subtitle">Register a new farmer to your network</p>
      </div>

      <div className="form-card">
        {errorMessage && (
          <div className="alert-error-banner">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert-success-banner">{successMessage}</div>
        )}

        <form onSubmit={(e) => handleRegisterFarmer(e, false)}>
          {/* Mapping through form structure data cleanly */}
          {formFields.map((field) => (
            <div className="form-group" key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <div className="input-wrapper">
                {field.icon}
                <input
                  type={field.type}
                  id={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  disabled={loading}
                />
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button
              type="submit"
              className="btn-save-farmer"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Farmer"}
            </button>
            <button
              type="button"
              className="btn-save-request"
              onClick={(e) => handleRegisterFarmer(e, true)}
              disabled={loading}
            >
              Save & Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFarm;
