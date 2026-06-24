import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineArrowLeft,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import { BiLeaf } from "react-icons/bi";
import "../CSS/AgentAddFarmer.css";

const AgentAddFarmer = ({ onBackClick, onFarmerAddedSuccessfully }) => {
  // Grab token from Redux state safely
  const token = useSelector((state) => state.auth?.token);

  // Clean up potential trailing slash from BaseUrl to avoid double slashes (e.g., http://api.com//agentDashboard)
  const rawBaseUrl = import.meta.env.VITE_BaseUrl || "";
  const BaseUrl = rawBaseUrl.endsWith("/")
    ? rawBaseUrl.slice(0, -1)
    : rawBaseUrl;

  const initialFormState = {
    farmerFullName: "",
    phoneNumber: "",
    farmLocation: "",
    mainProduceType: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  // Pop-up Modal Toggles
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Keep track of the submitted name for the modal display before resetting form state
  const [submittedName, setSubmittedName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setErrorMessage(
        "Authentication error: Log in session expired. Please re-login.",
      );
      setShowErrorModal(true);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${BaseUrl}/agent/createAgentFarmer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      // Checking for successful axios response ranges safely
      if (response.status === 200 || response.status === 201) {
        setSubmittedName(formData.farmerFullName); // Save name for the success modal text
        setShowSuccessModal(true);
        setFormData(initialFormState); // Reset the form inputs immediately
      }
    } catch (err) {
      // Robust error message extraction from server response configurations
      const fallbackError =
        "Failed to add farmer. Please check your entries and try again.";
      const serverMessage =
        err.response?.data?.message || err.response?.data?.error || err.message;

      setErrorMessage(serverMessage || fallbackError);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    if (onFarmerAddedSuccessfully) {
      onFarmerAddedSuccessfully();
    }
  };

  return (
    <div className="fg-add-farmer-container">
      <button type="button" className="fhub-back-btn" onClick={onBackClick}>
        <HiOutlineArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="fg-add-farmer-header">
        <h1 className="fg-add-farmer-title">Add New Farmer</h1>
        <p className="fg-add-farmer-subtitle">
          Register a new farmer to your network
        </p>
      </div>

      <form className="fg-add-farmer-card-form" onSubmit={handleSubmit}>
        <div className="fg-form-group">
          <label htmlFor="farmerFullName">Farmer Full Name</label>
          <div className="fg-input-icon-wrapper">
            <HiOutlineUser className="fg-input-icon" />
            <input
              id="farmerFullName"
              type="text"
              name="farmerFullName"
              value={formData.farmerFullName}
              onChange={handleChange}
              placeholder="e.g., Chukwu Okafor"
              required
            />
          </div>
        </div>

        <div className="fg-form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <div className="fg-input-icon-wrapper">
            <HiOutlinePhone className="fg-input-icon" />
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+234 803 456 7890"
              required
            />
          </div>
        </div>

        <div className="fg-form-group">
          <label htmlFor="farmLocation">Farm Location</label>
          <div className="fg-input-icon-wrapper">
            <HiOutlineLocationMarker className="fg-input-icon" />
            <input
              id="farmLocation"
              type="text"
              name="farmLocation"
              value={formData.farmLocation}
              onChange={handleChange}
              placeholder="e.g., Badagry, Lagos State"
              required
            />
          </div>
        </div>

        <div className="fg-form-group">
          <label htmlFor="mainProduceType">Main Produce Type</label>
          <div className="fg-input-icon-wrapper">
            <BiLeaf className="fg-input-icon" />
            <input
              id="mainProduceType"
              type="text"
              name="mainProduceType"
              value={formData.mainProduceType}
              onChange={handleChange}
              placeholder="e.g., Tomatoes, Yam, Cassava"
              required
            />
          </div>
        </div>

        <div className="fg-form-actions-row">
          <button
            type="submit"
            className="fg-btn-save-farmer"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Farmer"}
          </button>
        </div>
      </form>

      {/* SUCCESS MODAL POPUP */}
      {showSuccessModal && (
        <div className="fg-modal-overlay">
          <div className="fg-modal-card animate-popup">
            <div className="fg-modal-icon-box">
              <HiCheckCircle size={54} color="#044335" />
            </div>
            <h2 className="fg-modal-title">Registration Successful!</h2>
            <p className="fg-modal-message">
              <strong>{submittedName || "The farmer"}</strong> has been
              successfully added to your agent portal network.
            </p>
            <button
              type="button"
              className="fg-modal-btn"
              onClick={handleSuccessModalClose}
            >
              Continue to Network List
            </button>
          </div>
        </div>
      )}

      {/* ERROR MODAL POPUP */}
      {showErrorModal && (
        <div className="fg-modal-overlay">
          <div className="fg-modal-card animate-popup border-error-top">
            <div className="fg-modal-icon-box">
              <HiXCircle size={54} color="#dc2626" />
            </div>
            <h2 className="fg-modal-title" style={{ color: "#dc2626" }}>
              Registration Failed
            </h2>
            <p className="fg-modal-message">{errorMessage}</p>
            <button
              type="button"
              className="fg-modal-btn btn-error-color"
              onClick={() => setShowErrorModal(false)}
            >
              Okay, Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentAddFarmer;
