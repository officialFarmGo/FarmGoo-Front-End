import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { 
  HiOutlineArrowLeft, 
  HiOutlineUser, 
  HiOutlineLocationMarker, 
  HiOutlinePhone,
  HiXCircle
} from "react-icons/hi";
import { BiLeaf } from "react-icons/bi";
import { FiBox, FiTruck } from "react-icons/fi";
import "../CSS/AgentCreateRequest.css";

const AgentCreateRequest = ({ onBackClick, onViewDeliveriesClick, preselectedFarmer }) => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  // Initialize form state using the first ID from your actual vehicle list as default
  const [formData, setFormData] = useState({
    agentFarmerId: preselectedFarmer?._id || preselectedFarmer?.id || "",
    produceType: "",
    quantity: "",
    pickupLocation: preselectedFarmer?.farmLocation || preselectedFarmer?.location || "",
    Destination: "",
    customersName: "",
    customersDetails: "",
    vehicleType: "6a2dd9507901672d4346f51b" // Defaulting to Pickup Truck from your API data
  });

  const [farmers, setFarmers] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]); // Will hold dynamic database response

  const [pricing, setPricing] = useState({ deliveryFare: null, serviceFee: null, total: null });
  const [fetchingPrice, setFetchingPrice] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Modal Pop-up Display States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Fetch live vehicles directly from your exact API route
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/vehicle/allVehic`, {
          headers: { accept: "*/*" }
        });
        if (response.data?.data) {
          setVehicleTypes(response.data.data);
          // Safely set the initial value if not already manually altered
          if (response.data.data.length > 0) {
            setFormData(prev => ({ ...prev, vehicleType: response.data.data[0]._id }));
          }
        }
      } catch (err) {
        console.error("Failed to load official FarmGoo vehicle records:", err);
      }
    };
    fetchVehicles();
  }, [BaseUrl]);

  // 2. Grab available active network farmers
  useEffect(() => {
    const loadActiveFarmers = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/agentDashboard/agentsFarmersOverview`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data?.data?.farmers) {
          setFarmers(response.data.data.farmers);
        }
      } catch (err) {
        console.error("Failed to load active agent farmers network:", err);
      }
    };
    if (token) loadActiveFarmers();
  }, [token, BaseUrl]);

  // Run initial estimate if a preselected farmer with a location was passed down inline
  useEffect(() => {
    if (formData.pickupLocation && formData.Destination && formData.vehicleType) {
      triggerPriceEstimation(formData);
    }
  }, []);

  // Sync pricing estimates as fields change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedState = { ...prev, [name]: value };
      
      // Fire estimate endpoint whenever location variables or vehicle selections fluctuate
      if (name === "pickupLocation" || name === "Destination" || name === "vehicleType") {
        triggerPriceEstimation(updatedState);
      }
      return updatedState;
    });
  };

  // Live Price Estimator Connector matching your exact post structure
  const triggerPriceEstimation = async (currentFields) => {
    if (!currentFields.pickupLocation || !currentFields.Destination || !currentFields.vehicleType) return;
    try {
      setFetchingPrice(true);
      const res = await axios.post(`${BaseUrl}/agentDelivery/estimatePrice`, {
        pickupLocation: currentFields.pickupLocation,
        Destination: currentFields.Destination,
        vehicleType: currentFields.vehicleType
      }, {
        headers: { 
          accept: "*/*", 
          "Content-Type": "application/json" 
        }
      });

      if (res.data?.data) {
        setPricing({
          deliveryFare: res.data.data.deliveryFare,
          serviceFee: res.data.data.serviceFee,
          total: res.data.data.total
        });
      }
    } catch (err) {
      console.error("Price lookup error:", err);
    } finally {
      setFetchingPrice(false);
    }
  };

  // Master Post request firing sequence
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agentFarmerId) {
      setErrorMessage("Please select a farmer profile to bind this transport record.");
      setShowErrorModal(true);
      return;
    }

    try {
      setLoading(true);
      
      // Dynamic route URL using selected truck ID perfectly mirroring your 201 response pattern
      const response = await axios.post(
        `${BaseUrl}/agentDelivery/createDelivery/${formData.vehicleType}`,
        {
          agentFarmerId: formData.agentFarmerId,
          produceType: formData.produceType,
          quantity: formData.quantity,
          pickupLocation: formData.pickupLocation,
          Destination: formData.Destination,
          customersDetails: formData.customersDetails,
          customersName: formData.customersName
        },
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        setShowSuccessModal(true);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to confirm and launch delivery request. Verify connection.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnother = () => {
    setFormData({
      agentFarmerId: "",
      produceType: "",
      quantity: "",
      pickupLocation: "",
      Destination: "",
      customersName: "",
      customersDetails: "",
      vehicleType: vehicleTypes[0]?._id || ""
    });
    setPricing({ deliveryFare: null, serviceFee: null, total: null });
    setShowSuccessModal(false);
  };

  return (
    <div className="cr-req-page-container">
      <button type="button" className="fhub-back-btn" onClick={onBackClick}>
        <HiOutlineArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="cr-req-header">
        <h1 className="cr-req-title">Create Transport Request</h1>
        <p className="cr-req-subtitle">Fill in the fields below to deploy a transit log</p>
      </div>

      <form className="cr-req-card-form" onSubmit={handleSubmit}>
        
        <div className="cr-form-group">
          <label>Select Farmer</label>
          <div className="cr-select-wrapper">
            <HiOutlineUser className="cr-input-icon" />
            <select name="agentFarmerId" value={formData.agentFarmerId} onChange={handleChange} required>
              <option value="">Choose a farmer from your network</option>
              {farmers.map((farmer) => (
                <option key={farmer._id || farmer.id} value={farmer._id || farmer.id}>
                  {farmer.farmerFullName || "Unnamed Network Record"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="cr-form-group">
          <label>Produce Type</label>
          <div className="cr-input-wrapper">
            <BiLeaf className="cr-input-icon" />
            <input 
              type="text" 
              name="produceType"
              value={formData.produceType}
              onChange={handleChange}
              placeholder="e.g., Watermelon" 
              required
            />
          </div>
        </div>

        <div className="cr-form-group">
          <label>Quantity</label>
          <div className="cr-input-wrapper">
            <FiBox className="cr-input-icon" />
            <input 
              type="text" 
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 500kg" 
              required
            />
          </div>
        </div>

        <div className="cr-form-group">
          <label>Pickup Location</label>
          <div className="cr-input-wrapper">
            <HiOutlineLocationMarker className="cr-input-icon" />
            <input 
              type="text" 
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="e.g., Ikorodu, Lagos" 
              required
            />
          </div>
        </div>

        <div className="cr-form-group">
          <label>Destination</label>
          <div className="cr-input-wrapper">
            <HiOutlineLocationMarker className="cr-input-icon" />
            <input 
              type="text" 
              name="Destination"
              value={formData.Destination}
              onChange={handleChange}
              placeholder="e.g., Mile 12 Market, Lagos" 
              required
            />
          </div>
        </div>

        <div className="cr-form-group">
          <label>Customer's Name</label>
          <div className="cr-input-wrapper">
            <HiOutlineUser className="cr-input-icon" />
            <input 
              type="text" 
              name="customersName"
              value={formData.customersName}
              onChange={handleChange}
              placeholder="e.g., Taiwo Kehinde" 
              required
            />
          </div>
        </div>

        <div className="cr-form-group">
          <label>Customer's Phone Number</label>
          <div className="cr-input-wrapper">
            <HiOutlinePhone className="cr-input-icon" />
            <input 
              type="tel" 
              name="customersDetails"
              value={formData.customersDetails}
              onChange={handleChange}
              placeholder="e.g., 08034201969" 
              required
            />
          </div>
        </div>

        <div className="cr-form-group">
          <label>Vehicle Type Needed</label>
          <div className="cr-select-wrapper">
            <FiTruck className="cr-input-icon" />
            <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required>
              {vehicleTypes.length === 0 ? (
                <option value="">Loading vehicles...</option>
              ) : (
                vehicleTypes.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.vehicleType} 
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Dynamic Pricing Calculation Box */}
        <div className="cr-pricing-calculation-block">
          <div className="cr-pricing-row">
            <span className="cr-pricing-label">Estimated Price</span>
            <span className="cr-pricing-value">
              {fetchingPrice ? "Calculating..." : pricing.deliveryFare ? `₦${pricing.deliveryFare.toLocaleString()}` : "₦0"}
            </span>
          </div>
          <div className="cr-pricing-row">
            <span className="cr-pricing-label">Service Fee</span>
            <span className="cr-pricing-value">
              {fetchingPrice ? "Calculating..." : pricing.serviceFee ? `₦${pricing.serviceFee.toLocaleString()}` : "₦0"}
            </span>
          </div>
          <div className="cr-pricing-total-divider" />
          <div className="cr-pricing-row total-highlight">
            <span className="cr-pricing-label">Total Estimate</span>
            <span className="cr-pricing-value">
              {fetchingPrice ? "Calculating..." : pricing.total ? `₦${pricing.total.toLocaleString()}` : "₦0"}
            </span>
          </div>
        </div>

        <button type="submit" className="cr-submit-action-btn" disabled={loading || fetchingPrice}>
          {loading ? "Submitting Request..." : "Confirm & Launch Request"}
        </button>
      </form>

      {/* SUCCESS MODAL POPUP OVERLAY */}
      {showSuccessModal && (
        <div className="cr-modal-overlay">
          <div className="cr-modal-popup-card animate-scale-up">
            <div className="cr-modal-success-circle">
              <div className="cr-checkmark-icon" />
            </div>
            <h2 className="cr-modal-main-heading">Request Created!</h2>
            <p className="cr-modal-sub-clause">
              Drivers in your sector will receive this transport notification shortly.
            </p>
            <div className="cr-modal-actions-wrapper">
              <button type="button" className="cr-modal-btn-secondary" onClick={handleCreateAnother}>
                Create Another
              </button>
              <button type="button" className="cr-modal-btn-primary" onClick={onViewDeliveriesClick}>
                View Deliveries
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERROR MODAL POPUP OVERLAY */}
      {showErrorModal && (
        <div className="cr-modal-overlay">
          <div className="cr-modal-popup-card animate-scale-up" style={{ borderTop: "4px solid #dc2626" }}>
            <div className="cr-modal-success-circle" style={{ backgroundColor: "#fef2f2" }}>
              <HiXCircle size={44} color="#dc2626" />
            </div>
            <h2 className="cr-modal-main-heading" style={{ color: "#dc2626" }}>Request Failed</h2>
            <p className="cr-modal-sub-clause">
              {errorMessage}
            </p>
            <button 
              type="button" 
              className="cr-modal-btn-primary" 
              style={{ backgroundColor: "#dc2626", width: "100%" }}
              onClick={() => setShowErrorModal(false)}
            >
              Okay, Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentCreateRequest;