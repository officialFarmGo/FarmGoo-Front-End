import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  MdPersonOutline,
  MdLocationOn,
  MdPhone,
  MdLocalShipping,
  MdAttachMoney,
} from "react-icons/md";
import { GiTomato, GiCardboardBoxClosed } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import "../CSS/TransportRequest.css";

const TransportRequest = () => {
  const nav = useNavigate();
  const location = useLocation();
  const passedFarmer = location.state?.farmer;

  const [farmers, setFarmers] = useState([]);
  const [formData, setFormData] = useState({
    selectFarmer: passedFarmer?._id || passedFarmer?.id || "",
    produceType: passedFarmer?.produceType || "",
    quantity: "",
    pickupLocation: passedFarmer?.farmLocation || "",
    destination: "",
    customerName: "",
    customerPhone: "",
    vehicleType: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // FIX: Specifically select the auth slice to prevent dangerous root state re-renders
  const auth = useSelector((state) => state.auth);
  
  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        // FIX: Route updated to match your agentDashboard routing convention to fix 404 error
        const response = await axios.get(`${BASE_URL}/agentDashboard/getFarmers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.data) {
          setFarmers(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching farmers data list:", error);
      }
    };
    
    if (token) {
      fetchFarmers();
    }
  }, [BASE_URL, token]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "selectFarmer") {
      const selectedFarmerObj = farmers.find(
        (f) => f._id === value || f.id === value
      );
      setFormData((prev) => ({
        ...prev,
        selectFarmer: value,
        produceType: selectedFarmerObj?.produceType || "",
        pickupLocation: selectedFarmerObj?.farmLocation || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/;

    if (!formData.selectFarmer)
      tempErrors.selectFarmer = "Please select a farmer";
    if (!formData.produceType.trim())
      tempErrors.produceType = "Produce type is required";
    if (!formData.quantity.trim()) tempErrors.quantity = "Quantity is required";
    if (!formData.pickupLocation.trim())
      tempErrors.pickupLocation = "Pickup location is required";
    if (!formData.destination.trim())
      tempErrors.destination = "Destination is required";
    if (!formData.customerName.trim())
      tempErrors.customerName = "Customer name is required";

    if (!formData.customerPhone.trim()) {
      tempErrors.customerPhone = "Customer phone number is required";
    } else if (!phoneRegex.test(formData.customerPhone.replace(/\s+/g, ""))) {
      tempErrors.customerPhone = "Enter a valid Nigerian phone number";
    }

    if (!formData.vehicleType)
      tempErrors.vehicleType = "Please select a vehicle type";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = { ...formData, isDraft };
      const response = await axios.post(
        `${BASE_URL}/agentDashboard/createTransportRequest`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        nav(-1);
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
    <div className="transport-container">
      <div className="transport-header">
        <button className="back-btn" onClick={() => nav(-1)}>
          <span className="arrow">←</span> Back to Dashboard
        </button>
        <h1 className="header-title">Create Transport Request</h1>
        <p className="header-subtitle">
          Request transport for farmer's produce
        </p>
      </div>

      <div className="form-card">
        {errors.serverError && (
          <div className="error-message server-error">{errors.serverError}</div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="selectFarmer">Select Farmer</label>
            <div
              className={`input-wrapper select-wrapper ${errors.selectFarmer ? "input-error-border" : ""}`}
            >
              <MdPersonOutline className="input-icon" />
              <select
                id="selectFarmer"
                value={formData.selectFarmer}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Choose a farmer
                </option>
                {farmers.map((farmer) => (
                  <option
                    key={farmer._id || farmer.id}
                    value={farmer._id || farmer.id}
                  >
                    {farmer.farmerName || farmer.fullName}
                  </option>
                ))}
              </select>
            </div>
            {errors.selectFarmer && (
              <span className="error-text">{errors.selectFarmer}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="produceType">Produce Type</label>
            <div
              className={`input-wrapper ${errors.produceType ? "input-error-border" : ""}`}
            >
              <GiTomato className="input-icon" />
              <input
                type="text"
                id="produceType"
                value={formData.produceType}
                onChange={handleInputChange}
                placeholder="e.g., Tomatoes"
              />
            </div>
            {errors.produceType && (
              <span className="error-text">{errors.produceType}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity (kg or Bags)</label>
            <div
              className={`input-wrapper ${errors.quantity ? "input-error-border" : ""}`}
            >
              <GiCardboardBoxClosed className="input-icon" />
              <input
                type="text"
                id="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="e.g., 500kg"
              />
            </div>
            {errors.quantity && (
              <span className="error-text">{errors.quantity}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="pickupLocation">Pickup Location</label>
            <div
              className={`input-wrapper ${errors.pickupLocation ? "input-error-border" : ""}`}
            >
              <MdLocationOn className="input-icon" />
              <input
                type="text"
                id="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                placeholder="e.g., Oshodi, Lagos State"
              />
            </div>
            {errors.pickupLocation && (
              <span className="error-text">{errors.pickupLocation}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <div
              className={`input-wrapper ${errors.destination ? "input-error-border" : ""}`}
            >
              <MdLocationOn className="input-icon" />
              <input
                type="text"
                id="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="e.g., Mile 12 Market, Lagos"
              />
            </div>
            {errors.destination && (
              <span className="error-text">{errors.destination}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="customerName">Customer's Name</label>
            <div
              className={`input-wrapper ${errors.customerName ? "input-error-border" : ""}`}
            >
              <GoPerson className="input-icon" />
              <input
                type="text"
                id="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Toul"
              />
            </div>
            {errors.customerName && (
              <span className="error-text">{errors.customerName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="customerPhone">Customer's Details (Phone)</label>
            <div
              className={`input-wrapper ${errors.customerPhone ? "input-error-border" : ""}`}
            >
              <MdPhone className="input-icon" />
              <input
                type="tel"
                id="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                placeholder="0801 255 5118"
              />
            </div>
            {errors.customerPhone && (
              <span className="error-text">{errors.customerPhone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="vehicleType">Vehicle Type Needed</label>
            <div
              className={`input-wrapper select-wrapper ${errors.vehicleType ? "input-error-border" : ""}`}
            >
              <MdLocalShipping className="input-icon" />
              <select
                id="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select vehicle type
                </option>
                <option value="motorcycle">Motorcycle / Tricycle</option>
                <option value="van">Mini Van</option>
                <option value="truck_small">Small Truck (Dyna)</option>
                <option value="truck_large">Large Truck (Open/Closed)</option>
              </select>
            </div>
            {errors.vehicleType && (
              <span className="error-text">{errors.vehicleType}</span>
            )}
          </div>

          <div className="estimation-box">
            <div className="estimation-row">
              <MdAttachMoney className="est-icon" />
              <span className="est-text bold-text">Estimated Price</span>
            </div>
            <div className="estimation-row">
              <MdAttachMoney className="est-icon" />
              <span className="est-text bold-text">Service Fee</span>
            </div>
            <div className="estimation-divider">-</div>
            <p className="estimation-footer">
              Final price may vary based on driver bids and market conditions
            </p>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-submit"
              disabled={loading}
              onClick={(e) => handleSubmit(e, false)}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
            <button
              type="button"
              className="btn-save-draft"
              disabled={loading}
              onClick={(e) => handleSubmit(e, true)}
            >
              {loading ? "Saving..." : "Save Draft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportRequest;