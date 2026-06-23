import React, { useEffect, useState, useCallback } from "react";
import "../CSS/RequestTransport.css";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, LoadingOutlined, CloseCircleOutlined } from "@ant-design/icons";

const RequestTransport = ({ onClose }) => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorToast, setErrorToast] = useState(null);
  const [errors, setErrors] = useState({});

  const [estimate, setEstimate] = useState(null);
  const [estimating, setEstimating] = useState(false);

  const [form, setForm] = useState({
    productType: "",
    quantity: "",
    weight: "",
    AddressOrpickUpLocation: "",
    landMarkToAddressForPickup: "",
    Destination: "",
    customersName: "",
    customersPhoneNumber: "",
    CustomersOtherNumber: "",
    vehicleType: "",
  });

  const showError = (msg) => {
    setErrorToast(msg);
    setTimeout(() => setErrorToast(null), 4000);
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`${BaseUrl}/vehicle/allVehic`);
        const data = await res.json();
        if (res.ok) setVehicles(data.data ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVehicles();
  }, []);

  const fetchEstimate = useCallback(async (pickup, destination, vehicleId) => {
    if (!pickup.trim() || !destination.trim() || !vehicleId) return;
    setEstimating(true);
    setEstimate(null);
    try {
      const res = await fetch(`${BaseUrl}/delivery/estimateDeliveryPrice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          AddressOrpickUpLocation: pickup,
          Destination: destination,
          vehhicleId: vehicleId,
        }),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setEstimate(data.data);
      }
    } catch (err) {
      console.error("Estimate fetch failed:", err);
    } finally {
      setEstimating(false);
    }
  }, [BaseUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "vehicleType") {
      const found = vehicles.find((v) => v._id === value);
      setSelectedVehicle(found ?? null);
      if (updated.AddressOrpickUpLocation && updated.Destination && value) {
        fetchEstimate(updated.AddressOrpickUpLocation, updated.Destination, value);
      }
    }

    if (name === "AddressOrpickUpLocation" || name === "Destination") {
      if (updated.AddressOrpickUpLocation && updated.Destination && updated.vehicleType) {
        fetchEstimate(updated.AddressOrpickUpLocation, updated.Destination, updated.vehicleType);
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.productType.trim()) newErrors.productType = "Produce type is required";
    if (!form.quantity) newErrors.quantity = "Quantity is required";
    if (!form.weight) newErrors.weight = "Weight unit is required";
    if (!form.AddressOrpickUpLocation.trim()) newErrors.AddressOrpickUpLocation = "Pickup address is required";
    if (!form.landMarkToAddressForPickup.trim()) newErrors.landMarkToAddressForPickup = "Landmark is required";
    if (!form.Destination.trim()) newErrors.Destination = "Destination is required";
    if (!form.customersName.trim()) newErrors.customersName = "Customer name is required";
    if (!form.customersPhoneNumber.trim()) newErrors.customersPhoneNumber = "Phone number is required";
    else if (!/^\d{10,11}$/.test(form.customersPhoneNumber.replace(/\s/g, "")))
      newErrors.customersPhoneNumber = "Enter a valid phone number";
    if (!form.vehicleType) newErrors.vehicleType = "Please select a vehicle type";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError("Please fill all required fields correctly before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${BaseUrl}/delivery/createDelivery/${form.vehicleType}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productType: form.productType,
          quantity: form.quantity,
          weight: form.weight,
          AddressOrpickUpLocation: form.AddressOrpickUpLocation,
          landMarkToAddressForPickup: form.landMarkToAddressForPickup,
          Destination: form.Destination,
          customersName: form.customersName,
          customersPhoneNumber: form.customersPhoneNumber,
          CustomersOtherNumber: form.CustomersOtherNumber || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* LOCAL EMITTED INTERACTION STYLES FOR THE MODAL ERRORS */}
      <style>{`
        .rt-error-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          background-color: #ffffff;
          border-left: 5px solid #ef4444;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 16px 20px;
          z-index: 11000;
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 400px;
          width: calc(100% - 48px);
          animation: rtToastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          font-family: sans-serif;
        }
        .rt-error-toast-icon {
          color: #ef4444;
          font-size: 20px;
          flex-shrink: 0;
        }
        .rt-error-toast span {
          flex-grow: 1;
          font-size: 14px;
          color: #374151;
          font-weight: 500;
          line-height: 1.4;
        }
        .rt-error-toast-close {
          background: none;
          border: none;
          color: #9ca3af;
          font-size: 22px;
          cursor: pointer;
          padding: 0 4px;
          line-height: 1;
          transition: color 0.15s ease;
        }
        .rt-error-toast-close:hover {
          color: #4b5563;
        }
        @keyframes rtToastSlideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Error Toast Popup Banner */}
      {errorToast && (
        <div className="rt-error-toast">
          <CloseCircleOutlined className="rt-error-toast-icon" />
          <span>{errorToast}</span>
          <button type="button" className="rt-error-toast-close" onClick={() => setErrorToast(null)}>
            &times;
          </button>
        </div>
      )}

      {showSuccess && (
        <div className="rt-success-popup-overlay">
          <div className="rt-success-popup">
            <div className="rt-success-icon-ring">
              <CheckCircleOutlined className="rt-success-check-icon" />
            </div>
            <h2 className="rt-success-title">Transport Requested!</h2>
            <p className="rt-success-desc">
              Your transport request has been submitted. A driver will be assigned to you shortly.
            </p>
            <div className="rt-success-tracking">
              <span>We'll notify you once a driver accepts</span>
            </div>
          </div>
        </div>
      )}

      <div className="rt-modal-overlay">
        <div className="rt-modal-container">
          <header className="rt-modal-header">
            <div>
              <h1 className="rt-title">Request Transport</h1>
              <p className="rt-subtitle">Fill in the details to find a driver for your produce</p>
            </div>
            <button type="button" className="rt-close-btn" onClick={onClose}>&times;</button>
          </header>

          <div className="rt-form-scrollable">

            {/* Produce Details */}
            <div className="rt-card">
              <div className="rt-card-header">
                <span className="rt-icon rt-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22.08V12" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <h2>Produce Details</h2>
              </div>
              <div className="rt-form-row">
                <div className="rt-form-group">
                  <label>Produce Type</label>
                  <input
                    type="text"
                    name="productType"
                    placeholder="e.g. Tomatoes"
                    value={form.productType}
                    onChange={handleChange}
                    className={errors.productType ? "rt-input-error" : ""}
                  />
                  {errors.productType && <span className="rt-field-error">{errors.productType}</span>}
                </div>
                <div className="rt-form-row-nested">
                  <div className="rt-form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="0"
                      value={form.quantity}
                      onChange={handleChange}
                      className={errors.quantity ? "rt-input-error" : ""}
                    />
                    {errors.quantity && <span className="rt-field-error">{errors.quantity}</span>}
                  </div>
                  <div className="rt-form-group">
                    <label>Weight</label>
                    <select
                      name="weight"
                      value={form.weight}
                      onChange={handleChange}
                      className={errors.weight ? "rt-input-error" : ""}
                    >
                      <option value="">Select unit</option>
                      <option value="kg">kg</option>
                      <option value="tons">tons</option>
                      <option value="bags">bags</option>
                    </select>
                    {errors.weight && <span className="rt-field-error">{errors.weight}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="rt-card">
              <div className="rt-card-header">
                <span className="rt-icon rt-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <h2>Pickup Location</h2>
              </div>
              <div className="rt-form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="AddressOrpickUpLocation"
                  placeholder="e.g. Ikorodu, Lagos"
                  value={form.AddressOrpickUpLocation}
                  onChange={handleChange}
                  className={errors.AddressOrpickUpLocation ? "rt-input-error" : ""}
                />
                {errors.AddressOrpickUpLocation && <span className="rt-field-error">{errors.AddressOrpickUpLocation}</span>}
              </div>
              <div className="rt-form-group">
                <label>Landmark</label>
                <input
                  type="text"
                  name="landMarkToAddressForPickup"
                  placeholder="e.g. Near Ogun River Bridge"
                  value={form.landMarkToAddressForPickup}
                  onChange={handleChange}
                  className={errors.landMarkToAddressForPickup ? "rt-input-error" : ""}
                />
                {errors.landMarkToAddressForPickup && <span className="rt-field-error">{errors.landMarkToAddressForPickup}</span>}
              </div>
            </div>

            {/* Destination */}
            <div className="rt-card">
              <div className="rt-card-header">
                <span className="rt-icon rt-purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <h2>Destination</h2>
              </div>
              <div className="rt-form-group">
                <label>Market/Location</label>
                <input
                  type="text"
                  name="Destination"
                  placeholder="e.g. Mile 12 Market, Lagos"
                  value={form.Destination}
                  onChange={handleChange}
                  className={errors.Destination ? "rt-input-error" : ""}
                />
                {errors.Destination && <span className="rt-field-error">{errors.Destination}</span>}
              </div>
            </div>

            {/* Customer Details */}
            <div className="rt-card">
              <div className="rt-card-header">
                <span className="rt-icon rt-pink">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <h2>Customer's Details</h2>
              </div>
              <div className="rt-form-row">
                <div className="rt-form-group">
                  <label>Customer's Name</label>
                  <input
                    type="text"
                    name="customersName"
                    placeholder="John Doe"
                    value={form.customersName}
                    onChange={handleChange}
                    className={errors.customersName ? "rt-input-error" : ""}
                  />
                  {errors.customersName && <span className="rt-field-error">{errors.customersName}</span>}
                </div>
                <div className="rt-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="customersPhoneNumber"
                    placeholder="0801 255 5118"
                    value={form.customersPhoneNumber}
                    onChange={handleChange}
                    className={errors.customersPhoneNumber ? "rt-input-error" : ""}
                  />
                  {errors.customersPhoneNumber && <span className="rt-field-error">{errors.customersPhoneNumber}</span>}
                </div>
                <div className="rt-form-group">
                  <label>Other Number</label>
                  <input
                    type="tel"
                    name="CustomersOtherNumber"
                    placeholder="0801 255 5118"
                    value={form.CustomersOtherNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Type */}
            <div className="rt-card">
              <div className="rt-card-header">
                <span className="rt-icon rt-yellow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <h2>Vehicle Type</h2>
              </div>
              <div className="rt-form-group">
                <select
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  className={errors.vehicleType ? "rt-input-error" : ""}
                >
                  <option value="">Select vehicle type</option>
                  {vehicles.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.vehicleType}
                    </option>
                  ))}
                </select>
                {errors.vehicleType && <span className="rt-field-error">{errors.vehicleType}</span>}
              </div>
            </div>

            {/* Price Summary */}
            <div className="rt-card rt-price-card">
              <div className="rt-card-header">
                <h2>Estimated Price</h2>
                {estimating && <LoadingOutlined spin style={{ color: "#16A34A", fontSize: 16 }} />}
              </div>

              {estimate ? (
                <>
                  <div className="rt-price-row">
                    <span>Delivery Fare</span>
                    <p className="rt-price-value">₦{Number(estimate.deliveryFare).toLocaleString()}</p>
                  </div>
                  <div className="rt-price-row">
                    <span>Service Fee</span>
                    <p className="rt-price-value">₦{Number(estimate.serviceFee).toLocaleString()}</p>
                  </div>
                  <hr />
                  <div className="rt-price-row rt-total-row">
                    <strong>Total</strong>
                    <p className="rt-price-value rt-total">₦{Number(estimate.total).toLocaleString()}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="rt-price-row">
                    <span>Base Fare</span>
                    <p className="rt-price-value">
                      {selectedVehicle ? `₦${Number(selectedVehicle.baseFare).toLocaleString()}` : "—"}
                    </p>
                  </div>
                  <div className="rt-price-row">
                    <span>Rate Per Km</span>
                    <p className="rt-price-value">
                      {selectedVehicle ? `₦${selectedVehicle.ratePerKm}/km` : "—"}
                    </p>
                  </div>
                  <hr />
                  <div className="rt-price-row rt-total-row">
                    <strong>Vehicle Type</strong>
                    <p className="rt-price-value rt-total">
                      {selectedVehicle ? selectedVehicle.vehicleType : "—"}
                    </p>
                  </div>
                </>
              )}

              <p className="rt-price-note">
                {estimate
                  ? "This estimate is based on current route and vehicle selection."
                  : "Fill pickup, destination and vehicle to see live price estimate."}
              </p>
            </div>

            <button
              type="button"
              className="rt-submit-btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? <><LoadingOutlined spin /> Submitting...</> : "Request Transport"}
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default RequestTransport;