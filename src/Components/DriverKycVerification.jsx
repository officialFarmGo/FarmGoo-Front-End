import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/DriverKycVerification.css";
import {
  FiUploadCloud,
  FiChevronDown,
  FiFileText,
  FiCamera,
  FiAlertTriangle,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { authToken } from "../LIB/AuthenticationSlice";
import axios from "axios";

const DriverKycVerification = () => {
  const navigate = useNavigate();
  const { driverId } = useParams();
  const auth = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();

  const [vehicleType, setVehicleType] = useState("");
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({
    driversLicense: null,
    vehiclePhoto: null,
    vehiclePapers: null,
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BaseUrl}/vehicle/allVehic`
        );
        setVehicleOptions(response.data?.data || []);
      } catch (error) {
        console.error("Failed to load vehicle types:", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleFileChange = (section, e) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({ ...prev, [section]: e.target.files[0] }));
    }
  };

  const calculateProgress = () => {
    let completedItems = 0;
    if (files.driversLicense) completedItems += 1;
    if (files.vehiclePhoto) completedItems += 1;
    if (files.vehiclePapers) completedItems += 1;
    if (vehicleType) completedItems += 1;
    return completedItems * 25;
  };

  const currentProgress = calculateProgress();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentProgress < 100) {
      setShowErrorModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("driversLicense", files.driversLicense);
    formData.append("vehiclePhoto", files.vehiclePhoto);
    formData.append("VehiclePapers", files.vehiclePapers);
    formData.append("vehicleType", vehicleType);

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/driverKyc/createKyc/${driverId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(authToken(response.data.token));
      navigate("/driverpending");
    } catch (error) {
      if (error.response) {
        // Server replied with an error status
        alert(`Server Error: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Request sent but no response received
        alert("No response from server. Check your internet connection and try again.");
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fg-kyc-page-wrapper">
      <div className="fg-kyc-header-block">
        <div className="fg-kyc-logo-box">
          <svg
            className="fg-kyc-logo-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h1 className="fg-kyc-main-title">Driver Verification</h1>
        <p className="fg-kyc-subtitle">
          Upload your documents to get verified and start earning
        </p>
      </div>

      <div className="fg-kyc-form-container">
        <div className="fg-kyc-progress-wrapper">
          <div className="fg-kyc-progress-labels">
            <span>Step 1 of 2: Document Upload</span>
            <span>{currentProgress}% Complete</span>
          </div>
          <div className="fg-kyc-progress-track">
            <div
              className="fg-kyc-progress-fill"
              style={{ width: `${currentProgress}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="fg-kyc-form-element">
          <div className="fg-kyc-doc-card">
            <div className="fg-kyc-icon-badge badge-green">
              <FiFileText />
            </div>
            <div className="fg-kyc-doc-info">
              <h3 className="fg-kyc-doc-title">Driver's License</h3>
              <p className="fg-kyc-doc-desc">
                Upload a clear photo of your valid driver's license
              </p>
              <label className="fg-kyc-upload-trigger">
                <FiUploadCloud className="fg-kyc-upload-icon" />
                <span>
                  {files.driversLicense
                    ? files.driversLicense.name
                    : "Choose File"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="fg-kyc-hidden-input"
                  onChange={(e) => handleFileChange("driversLicense", e)}
                />
              </label>
            </div>
          </div>

          <div className="fg-kyc-doc-card">
            <div className="fg-kyc-icon-badge badge-blue">
              <FiCamera />
            </div>
            <div className="fg-kyc-doc-info">
              <h3 className="fg-kyc-doc-title">Vehicle Photo</h3>
              <p className="fg-kyc-doc-desc">
                Clear photo of your vehicle showing the license plate
              </p>
              <label className="fg-kyc-upload-trigger">
                <FiUploadCloud className="fg-kyc-upload-icon" />
                <span>
                  {files.vehiclePhoto ? files.vehiclePhoto.name : "Choose File"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="fg-kyc-hidden-input"
                  onChange={(e) => handleFileChange("vehiclePhoto", e)}
                />
              </label>
            </div>
          </div>

          <div className="fg-kyc-doc-card">
            <div className="fg-kyc-icon-badge badge-purple">
              <FiFileText />
            </div>
            <div className="fg-kyc-doc-info">
              <h3 className="fg-kyc-doc-title">Vehicle Papers</h3>
              <p className="fg-kyc-doc-desc">
                Vehicle registration, insurance, or roadworthiness certificate
              </p>
              <label className="fg-kyc-upload-trigger">
                <FiUploadCloud className="fg-kyc-upload-icon" />
                <span>
                  {files.vehiclePapers
                    ? files.vehiclePapers.name
                    : "Choose File"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="fg-kyc-hidden-input"
                  onChange={(e) => handleFileChange("vehiclePapers", e)}
                />
              </label>
            </div>
          </div>

          <div className="fg-kyc-dropdown-card">
            <label className="fg-kyc-dropdown-label">Vehicle Type</label>
            <div className="fg-kyc-select-wrapper">
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="fg-kyc-native-select"
              >
                <option value="" disabled>
                  Select vehicle type
                </option>
                {vehicleOptions.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.vehicleType}
                  </option>
                ))}
              </select>
              <div className="fg-kyc-select-arrow">
                <FiChevronDown />
              </div>
            </div>
          </div>

          <div className="fg-kyc-action-block">
            <button
              type="submit"
              className="fg-kyc-submit-btn"
              disabled={loading}
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Submitting Verification..." : "Submit for Verification"}
            </button>
          </div>
        </form>
      </div>

      {showErrorModal && (
        <div className="fg-modal-overlay">
          <div className="fg-modal-box">
            <div className="fg-modal-icon fg-brand-accent-color">
              <FiAlertTriangle />
            </div>
            <h2 className="fg-modal-title">Incomplete Verification</h2>
            <p className="fg-modal-text">
              Please ensure all requested files are correctly selected and your
              vehicle configuration type is set before proceeding.
            </p>
            <button
              className="fg-modal-close-btn"
              onClick={() => setShowErrorModal(false)}
            >
              Return to Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverKycVerification;