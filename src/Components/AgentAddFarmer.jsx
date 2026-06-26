import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { 
  HiOutlineUser, 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlineArrowLeft,
  HiCheckCircle,
  HiXCircle 
} from "react-icons/hi";
import { BiLeaf } from "react-icons/bi";
import "../CSS/AgentAddFarmer.css";

const AgentAddFarmer = ({ onBackClick, onFarmerAddedSuccessfully }) => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [formData, setFormData] = useState({
    farmerFullName: "",
    phoneNumber: "",
    farmLocation: "",
    mainProduceType: ""
  });
  
  const [loading, setLoading] = useState(false);
  
  // Pop-up Modal Toggles
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(
        `${BaseUrl}/agent/createAgentFarmer`, 
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 || response.status === 201) {
        setShowSuccessModal(true);
      }
    } catch (err) {
      // Catch backend error messages and trigger the error pop-up modal
      const fallbackError = "Failed to add farmer. Please check your entries and try again.";
      setErrorMessage(err.response?.data?.message || fallbackError);
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
        <p className="fg-add-farmer-subtitle">Register a new farmer to your network</p>
      </div>

      <form className="fg-add-farmer-card-form" onSubmit={handleSubmit}>
        <div className="fg-form-group">
          <label>Farmer Full Name</label>
          <div className="fg-input-icon-wrapper">
            <HiOutlineUser className="fg-input-icon" />
            <input 
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
          <label>Phone Number</label>
          <div className="fg-input-icon-wrapper">
            <HiOutlinePhone className="fg-input-icon" />
            <input 
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
          <label>Farm Location</label>
          <div className="fg-input-icon-wrapper">
            <HiOutlineLocationMarker className="fg-input-icon" />
            <input 
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
          <label>Main Produce Type</label>
          <div className="fg-input-icon-wrapper">
            <BiLeaf className="fg-input-icon" />
            <input 
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
          <button type="submit" className="fg-btn-save-farmer" disabled={loading}>
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
              <strong>{formData.farmerFullName || "The farmer"}</strong> has been successfully added to your agent portal network.
            </p>
            <button type="button" className="fg-modal-btn" onClick={handleSuccessModalClose}>
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
            <h2 className="fg-modal-title" style={{ color: "#dc2626" }}>Registration Failed</h2>
            <p className="fg-modal-message">
              {errorMessage}
            </p>
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