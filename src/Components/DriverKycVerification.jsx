import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/DriverKycVerification.css";
import {
  FiUploadCloud,
  FiChevronDown,
  FiFileText,
  FiCamera,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { authToken } from "../LIB/AuthenticationSlice";
import axios from "axios";

const DriverKycVerification = () => {
  const navigate = useNavigate();
  const { driverId } = useParams();
  const auth = useSelector((state) => state.auth || {});
  const user = auth.user || {};
  const dispatch = useDispatch();

  const [vehicleType, setVehicleType] = useState("");
  const [vehicleOptions, setVehicleOptions] = useState([]);
  
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // Track upload phase text
  
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

  // Helper function to compress high-res mobile photos using canvas element before uploading
  const compressImageFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Cap max dimension to 1200px to maintain crisp layout detail while lowering weight
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Convert canvas buffer to Blob (0.7 means 70% JPEG quality)
          ctx.canvas.toBlob((blob) => {
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now()
            });
            resolve(compressedFile);
          }, "image/jpeg", 0.7);
        };
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (currentProgress < 100) {
      setShowErrorModal(true);
      return;
    }

    const activeDriverId = 
      driverId && driverId !== "undefined" 
        ? driverId 
        : (user._id || user.id);

    if (!activeDriverId) {
      setApiError("Authentication session expired. Could not identify your profile reference. Please log in again.");
      return;
    }

    setLoading(true);
    setUploadStatus("Optimizing document files...");

    try {
      // Compress files sequentially in memory to keep payload light
      const compressedLicense = await compressImageFile(files.driversLicense);
      const compressedPhoto = await compressImageFile(files.vehiclePhoto);
      const compressedPapers = await compressImageFile(files.vehiclePapers);

      setUploadStatus("Uploading documents to FarmGoo networks...");

      const formData = new FormData();
      formData.append("driversLicense", compressedLicense);
      formData.append("vehiclePhoto", compressedPhoto);
      formData.append("VehiclePapers", compressedPapers);
      formData.append("vehicleType", vehicleType);

      const response = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/driverKyc/createKyc/${activeDriverId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 120000, // Manually sets Axios request network timeout configuration limit to 2 full minutes
        }
      );

      dispatch(authToken(response.data.token));
      navigate("/driverpending");
    } catch (error) {
      console.error("KYC Submission error context:", error);
      
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        setApiError("The upload timed out due to network congestion. Your image sizes were too large or your internet connection slowed down. Please try again.");
      } else if (error.response) {
        setApiError(error.response.data?.message || `Server responded with status code: ${error.response.status}`);
      } else if (error.request) {
        setApiError("Network timeout. Unable to establish stable pipeline with the server arrays. Try checking your internet upload speed.");
      } else {
        setApiError(error.message);
      }
    } finally {
      setLoading(false);
      setUploadStatus("");
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                disabled={loading}
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
              {loading ? uploadStatus : "Submit for Verification"}
            </button>
          </div>
        </form>
      </div>

      {/* FORM VALIDATION TRACKING ERROR MODAL */}
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

      {/* API/TIMEOUT ERROR WINDOW MODAL */}
      {apiError && (
        <div className="fg-modal-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div className="fg-modal-box" style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            maxWidth: "400px",
            width: "90%",
            textAlign: "center",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)"
          }}>
            <div style={{ color: "#ef4444", fontSize: "44px", marginBottom: "12px", display: "flex", justifyContent: "center" }}>
              <FiXCircle />
            </div>
            <h2 className="fg-modal-title" style={{ margin: "0 0 8px 0", fontSize: "20px", color: "#111827", fontWeight: "600" }}>
              Submission Error
            </h2>
            <p className="fg-modal-text" style={{ margin: "0 0 20px 0", color: "#4b5563", fontSize: "14px", lineHeight: "1.5" }}>
              {apiError}
            </p>
            <button
              className="fg-modal-close-btn"
              onClick={() => setApiError(null)}
              style={{
                backgroundColor: "#111827",
                color: "#ffffff",
                border: "none",
                padding: "10px 24px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                width: "100%"
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverKycVerification;