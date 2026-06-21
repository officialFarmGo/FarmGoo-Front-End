import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  MdPersonOutline,
  MdLocationOn,
  MdPhone,
  MdLocalShipping,
  MdAttachMoney,
  MdCheckCircle,
} from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { PiPlantThin } from "react-icons/pi";
import { BsBoxSeamFill } from "react-icons/bs";
import "../CSS/TransportRequest.css";

const TransportRequest = () => {
  const nav = useNavigate();
  const location = useLocation();
  const passedFarmer = location.state?.farmer;

  const [farmers, setFarmers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [pricing, setPricing] = useState({
    deliveryFare: 0,
    serviceFee: 0,
    total: 0,
  });

  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalType, setModalType] = useState("request");

  const [formData, setFormData] = useState({
    selectFarmer: passedFarmer?._id || passedFarmer?.id || "",
    produceType:
      passedFarmer?.mainProduceType || passedFarmer?.produceType || "",
    quantity: "",
    pickupLocation: passedFarmer?.farmLocation || "",
    destination: "",
    customerName: "",
    customerPhone: "",
    vehicleType: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state) => state.auth);

  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token") || auth?.token;

  const debounceTimeoutRef = useRef(null);

  const selectedVehicleObj = useMemo(() => {
    return vehicles.find((v) => v._id === formData.vehicleType);
  }, [vehicles, formData.vehicleType]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/agent/getFarmersUnderAgent`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const rawData = response.data?.data || response.data;

        if (rawData) {
          if (Array.isArray(rawData)) {
            setFarmers(rawData);
          } else if (typeof rawData === "object") {
            setFarmers([rawData]);
          }
        }
      } catch (error) {
        console.error("Error fetching farmers data list:", error);
      }
    };

    if (token) {
      fetchFarmers();
    }
  }, [BASE_URL, token]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/vehicle/allVehic`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const vehicleData = response.data?.data || response.data;

        if (vehicleData && Array.isArray(vehicleData)) {
          setVehicles(vehicleData);
        }
      } catch (error) {
        console.error("Error fetching vehicle categories:", error);
      }
    };

    if (token) {
      fetchVehicles();
    }
  }, [BASE_URL, token]);

  const fetchEstimate = useCallback(async () => {
    const { vehicleType, pickupLocation, destination, quantity, produceType } =
      formData;

    if (
      !vehicleType ||
      !pickupLocation.trim() ||
      pickupLocation.trim().length < 4 ||
      !destination.trim() ||
      destination.trim().length < 4
    ) {
      setPricing({ deliveryFare: 0, serviceFee: 0, total: 0 });
      setPricingError("");
      return;
    }

    if (!selectedVehicleObj) return;

    setPricingLoading(true);
    setPricingError("");

    try {
      const quantityValue = quantity?.trim() || "0";
      const numericQuantity =
        Number(quantityValue.replace(/[^0-9.]/g, "")) || 1;

      const estimatePayload = {
        vehicleType: selectedVehicleObj._id,
        pickupLocation: pickupLocation.trim(),
        Destination: destination.trim(),
        quantity: numericQuantity,
        produceType: produceType.trim() || "Cassava",
      };

      const response = await axios.post(
        `${BASE_URL}/agentDelivery/estimatePrice`,
        estimatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const resBody = response.data;
      const pricingData = resBody?.data || resBody;

      if (pricingData) {
        setPricing({
          deliveryFare: pricingData.deliveryFare || 0,
          serviceFee: pricingData.serviceFee || 0,
          total: pricingData.total || 0,
        });
      } else {
        setPricingError(
          "Unable to read valid price matrix elements from payload.",
        );
      }
    } catch (error) {
      console.error("Error fetching price estimate:", error);
      const backendMessage =
        error.response?.data?.message || error.response?.data?.error;
      setPricingError(
        backendMessage ||
          "Calculating route distance failed. Please check your addresses or backend logs.",
      );
      setPricing({ deliveryFare: 0, serviceFee: 0, total: 0 });
    } finally {
      setPricingLoading(false);
    }
  }, [formData, selectedVehicleObj, BASE_URL, token]);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchEstimate();
    }, 600);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [fetchEstimate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "selectFarmer") {
      const selectedFarmerObj = farmers.find(
        (f) => f._id === value || f.id === value,
      );

      setFormData((prev) => ({
        ...prev,
        selectFarmer: value,
        produceType:
          selectedFarmerObj?.mainProduceType ||
          selectedFarmerObj?.produceType ||
          "",
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
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        agentFarmerId: formData.selectFarmer,
        produceType: formData.produceType,
        quantity: formData.quantity,
        pickupLocation: formData.pickupLocation.trim(),
        Destination: formData.destination.trim(),
        customersDetails: formData.customerPhone,
        customersName: formData.customerName,
        isDraft,
        estimatedPrice: pricing.deliveryFare,
        serviceFee: pricing.serviceFee,
        totalPrice: pricing.total,
      };

      const vehicleId = selectedVehicleObj?._id || formData.vehicleType;

      const response = await axios.post(
        `${BASE_URL}/agentDelivery/createDelivery/${vehicleId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data) {
        setModalType(isDraft ? "draft" : "request");
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error(error);
      const backendMessage =
        error.response?.data?.message || error.response?.data?.error || "";

      const isLowBalance =
        backendMessage.toLowerCase().includes("insufficient") ||
        backendMessage.toLowerCase().includes("balance") ||
        backendMessage.toLowerCase().includes("funds") ||
        error.response?.status === 402;

      if (isLowBalance) {
        setErrors({
          serverError:
            "Insufficient funds to process this transport request. Please top up your wallet account.",
        });
      } else if (backendMessage) {
        setErrors({ serverError: backendMessage });
      } else {
        setErrors({
          serverError:
            "An unexpected error occurred during submission. Verify endpoint configurations.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    nav("/agent/dashboard");
  };

  return (
    <div className="transport-container" style={{ position: "relative" }}>
      <div className="transport-header">
        <button className="back-btn" onClick={() => nav("/agent/dashboard")}>
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
                    key={farmer?._id || farmer?.id}
                    value={farmer?._id || farmer?.id}
                  >
                    {farmer?.farmerFullName ||
                      farmer?.farmerName ||
                      "Unnamed Farmer"}
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
              <PiPlantThin className="input-icon" />
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
              <BsBoxSeamFill className="input-icon" />
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
                placeholder="e.g., John Doe"
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
                type="text"
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
                  {vehicles.length === 0
                    ? "Loading vehicle options..."
                    : "Select vehicle type"}
                </option>
                {vehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.vehicleType}
                  </option>
                ))}
              </select>
            </div>
            {errors.vehicleType && (
              <span className="error-text">{errors.vehicleType}</span>
            )}
          </div>

          {pricingError && (
            <div
              className="error-message pricing-error-alert"
              style={{ color: "#d32f2f", fontSize: "0.9em", margin: "10px 0" }}
            >
              {pricingError}
            </div>
          )}

          <div className="estimation-box">
            <div
              className="estimation-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdAttachMoney className="est-icon" />
                <span className="est-text">Estimated Price</span>
              </div>
              <span className="bold-text">
                {pricingLoading
                  ? "Calculating..."
                  : formatCurrency(pricing.deliveryFare)}
              </span>
            </div>

            <div
              className="estimation-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdAttachMoney className="est-icon" />
                <span className="est-text">Service Fee</span>
              </div>
              <span className="bold-text">
                {pricingLoading
                  ? "Calculating..."
                  : formatCurrency(pricing.serviceFee)}
              </span>
            </div>

            <div
              className="estimation-divider"
              style={{ borderTop: "1px dashed #ccc", margin: "8px 0" }}
            ></div>

            <div
              className="estimation-row total-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "1.1em",
                marginTop: "4px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdAttachMoney
                  className="est-icon"
                  style={{ color: "#2e7d32" }}
                />
                <span className="est-text" style={{ color: "#2e7d32" }}>
                  Total Price
                </span>
              </div>
              <span style={{ color: "#2e7d32" }}>
                {pricingLoading
                  ? "Calculating..."
                  : formatCurrency(pricing.total)}
              </span>
            </div>

            <p
              className="estimation-footer"
              style={{ marginTop: "12px", fontSize: "0.85em", color: "#666" }}
            >
              Final price may vary based on driver bids and market conditions
            </p>
          </div>

          <div
            className="form-actions"
            style={{ display: "flex", gap: "12px", marginTop: "20px" }}
          >
            <button
              type="button"
              className="btn-submit"
              disabled={loading || pricingLoading}
              onClick={(e) => handleSubmit(e, false)}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
            <button
              type="button"
              className="btn-save-draft"
              disabled={loading || pricingLoading}
              onClick={(e) => handleSubmit(e, true)}
            >
              {loading ? "Saving..." : "Save Draft"}
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "450px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            <MdCheckCircle
              style={{
                fontSize: "60px",
                color: "#2e7d32",
                marginBottom: "15px",
              }}
            />
            <h2
              style={{ fontSize: "24px", color: "#333", marginBottom: "8px" }}
            >
              {modalType === "draft"
                ? "Draft Saved!"
                : "Request Created Successfully!"}
            </h2>
            <p
              style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}
            >
              {modalType === "draft"
                ? "Your transport job request formulation has been saved securely."
                : "Your transport logistics booking has been published to the network."}
            </p>

            <div
              style={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "24px",
                textAlign: "left",
              }}
            >
              <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>
                <strong>Pickup:</strong> {formData.pickupLocation}
              </p>
              <p
                style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#333" }}
              >
                <strong>Destination:</strong> {formData.destination}
              </p>
            </div>

            <button
              onClick={handleModalClose}
              style={{
                backgroundColor: "#2e7d32",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportRequest;
