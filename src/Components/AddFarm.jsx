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

  // Modal tracking states
  const [showModal, setShowModal] = useState(false);
  const [createdFarmerData, setCreatedFarmerData] = useState(null);

  // Track which button triggered the submission flow to control loading text
  const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);

  const nav = useNavigate();

  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  const validateForm = () => {
    let tempErrors = {};
    const phoneRegex = /^[0-9]{11,14}$/;

    if (!formData.farmerFullName.trim()) {
      tempErrors.farmerFullName = "Farmer full name is required";
    } else if (formData.farmerFullName.trim().length < 3) {
      tempErrors.farmerFullName = "Name must be at least 3 characters long";
    }

    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      tempErrors.phoneNumber =
        "Enter a valid phone number (only numbers allowed)";
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

    // Strict non-numeric keystroke filter block
    if (id === "phoneNumber") {
      const onlyNumbers = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [id]: onlyNumbers,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }

    // Clear dynamic field error borders instantly on user typing entry
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const executeSubmitFlow = async (e, shouldRedirect) => {
    e.preventDefault();
    setRedirectOnSuccess(shouldRedirect);

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

      if (response.data && response.data.data) {
        setCreatedFarmerData(response.data.data);

        if (shouldRedirect) {
          // Navigates directly to the correct Transport Request subroute view
          nav("/agent/dashboard/TransportRequest", {
            state: { farmer: response.data.data },
          });
        } else {
          // If clicked "Save Farmer", reveal completion status modal overlay view
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error("Error creating farmer:", error);
      if (error.response?.data?.message) {
        setErrors({ serverError: error.response.data.message });
      } else {
        setErrors({
          serverError: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTransportRequest = () => {
    setShowModal(false);
    // Navigates precisely to the targeted transport request page route path
    nav("/agent/dashboard/TransportRequest", {
      state: { farmer: createdFarmerData },
    });
  };

  const handleGoToDashboard = () => {
    setShowModal(false);
    // Navigates straight back to the principal agent dashboard overview
    nav("/agent/dashboard");
  };

  return (
    <div className="add-farm-container">
      <div className="add-farm-header">
        <button className="back-btn" onClick={() => nav("/agent/dashboard")}>
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
                inputMode="numeric"
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
                id="mainProduceType"
                value={formData.mainProduceType}
                onChange={handleInputChange}
                placeholder="e.g., Tomatoes, Yam, Cassava"
              />
            </div>
            {errors.mainProduceType && (
              <span className="error-text">{errors.mainProduceType}</span>
            )}
          </div>

          {/* Dual Action Buttons Row Layout */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-save-farmer"
              disabled={loading}
              onClick={(e) => executeSubmitFlow(e, false)}
            >
              {loading && !redirectOnSuccess ? "Saving..." : "Save Farmer"}
            </button>
            <button
              type="button"
              className="btn-save-request"
              disabled={loading}
              onClick={(e) => executeSubmitFlow(e, true)}
            >
              {loading && redirectOnSuccess
                ? "Saving..."
                : "Save & Create Request"}
            </button>
          </div>
        </form>
      </div>

      {/* --- SUCCESS MODAL OVERLAY --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="success-modal-card">
            <div className="modal-icon-circle">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00ca72"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h2>Farmer Added Successfully!</h2>

            <p>
              <span className="farmer-id-highlight">
                {createdFarmerData?.farmerId ||
                  createdFarmerData?.farmerFullName ||
                  "New Farmer"}
              </span>{" "}
              has been added to your farmers list
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-modal-secondary"
                onClick={handleCreateTransportRequest}
              >
                Create Transport Request
              </button>
              <button
                type="button"
                className="btn-modal-primary"
                onClick={handleGoToDashboard}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFarm;
