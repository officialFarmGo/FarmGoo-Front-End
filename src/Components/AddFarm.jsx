import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdPersonOutline, MdPhone, MdLocationOn } from "react-icons/md";
import { GiTomato } from "react-icons/gi";
import "../CSS/AddFarm.css";

const AddFarm = () => {
  const [formData, setFormData] = useState({
    farmerFullName: "",
    phoneNumber: "",
    farmLocation: "",
    mainProduceType: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const userToken = useSelector((state) => state);
  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  const validateForm = () => {
    let tempErrors = {};
    const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/;

    if (!formData.farmerFullName.trim()) {
      tempErrors.farmerFullName = "Farmer full name is required";
    } else if (formData.farmerFullName.trim().length < 3) {
      tempErrors.farmerFullName = "Name must be at least 3 characters long";
    }

    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ""))) {
      tempErrors.phoneNumber =
        "Enter a valid Nigerian phone number (e.g. 08034567890)";
    }

    if (!formData.farmLocation.trim()) {
      tempErrors.farmLocation = "Farm location is required";
    }

    if (!formData.mainProduceType.trim()) {
      tempErrors.mainProduceType = "Main produce type is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleSubmit = async (e, redirectToRequest = false) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/agent/createAgentFarmer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        if (redirectToRequest) {
          // Pointed to your actual route definition name matching your dashboard setup
          nav("/agent/dashboard/TransportRequest", {
            state: { farmer: response.data.data },
          });
        } else {
          nav(-1);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        setErrors({ serverError: error.response.data.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-farm-container">
      <div className="add-farm-header">
        <button className="back-btn" onClick={() => nav(-1)}>
          <span className="arrow">←</span> Back to Dashboard
        </button>
        <h1 className="header-title">Add New Farmer</h1>
        <p className="header-subtitle">Register a new farmer to your network</p>
      </div>

      <div className="form-card">
        {errors.serverError && (
          <div className="error-message server-error">{errors.serverError}</div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="farmerFullName">Farmer Full Name</label>
            <div
              className={`input-wrapper ${errors.farmerFullName ? "input-error-border" : ""}`}
            >
              <MdPersonOutline className="input-icon" />
              <input
                type="text"
                id="farmerFullName"
                value={formData.farmerFullName}
                onChange={handleInputChange}
                placeholder="e.g., Chukwu Okafor"
              />
            </div>
            {errors.farmerFullName && (
              <span className="error-text">{errors.farmerFullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <div
              className={`input-wrapper ${errors.phoneNumber ? "input-error-border" : ""}`}
            >
              <MdPhone className="input-icon" />
              <input
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+234 803 456 7890"
              />
            </div>
            {errors.phoneNumber && (
              <span className="error-text">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="farmLocation">Farm Location</label>
            <div
              className={`input-wrapper ${errors.farmLocation ? "input-error-border" : ""}`}
            >
              <MdLocationOn className="input-icon" />
              <input
                type="text"
                id="farmLocation"
                value={formData.farmLocation}
                onChange={handleInputChange}
                placeholder="e.g., Badagry, Lagos State"
              />
            </div>
            {errors.farmLocation && (
              <span className="error-text">{errors.farmLocation}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mainProduceType">Main Produce Type</label>
            <div
              className={`input-wrapper ${errors.mainProduceType ? "input-error-border" : ""}`}
            >
              <GiTomato className="input-icon" />
              <input
                type="text"
                id="mainProduceType" // Updated ID matching state payload key
                value={formData.mainProduceType}
                onChange={handleInputChange}
                placeholder="e.g., Tomatoes, Yam, Cassava"
              />
            </div>
            {errors.mainProduceType && (
              <span className="error-text">{errors.mainProduceType}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-save-farmer"
              disabled={loading}
              onClick={(e) => handleSubmit(e, false)}
            >
              {loading ? "Saving..." : "Save Farmer"}
            </button>
            <button
              type="button"
              className="btn-save-request"
              disabled={loading}
              onClick={(e) => handleSubmit(e, true)}
            >
              {loading ? "Saving..." : "Save & Create Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFarm;
