import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBox,
  FaChartLine,
  FaChevronDown,
  FaMapMarkerAlt,
  FaUser,
  FaTimesCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import "../../CSS/FarmerProfile.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { authToken } from "../../LIB/AuthenticationSlice";
import { useDispatch } from "react-redux";

const FarmerProfile = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { farmId } = useParams();
  const auth = useSelector((state) => state.auth || {});
  const user = auth.user || {};
  const profileData = location.state || user;
  const dispatch = useDispatch();

  const [selectedProduce, setSelectedProduce] = useState([]);
  const [produceOptions, setProduceOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Custom Error Modal State
  const [modalError, setModalError] = useState(null);

  const [formData, setFormData] = useState({
    state: "",
    specificLocationOrLandmark: "",
    preferredMarketDestination: "",
    farmSize: "",
  });

  const fetchProduceOptions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/crop/getAllCrops`,
      );
      const crops = response.data?.data;
      setProduceOptions(Array.isArray(crops) ? crops.filter(Boolean) : []);
    } catch (error) {
      console.error("Error fetching produce options:", error);
      setProduceOptions([]);
    }
  };

  useEffect(() => {
    fetchProduceOptions();
  }, []);

  const toggleProduce = (itemId) => {
    setSelectedProduce((prev) =>
      prev.includes(itemId)
        ? prev.filter((produceId) => produceId !== itemId)
        : [...prev, itemId],
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Secure target ID calculation (URL param vs Redux user properties fallback)
    const activeFarmerId =
      farmId && farmId !== "undefined"
        ? farmId
        : user._id || user.id || profileData._id || profileData.id;

    if (!activeFarmerId) {
      setModalError(
        "Unable to identify your profile ID session. Please try logging in again.",
      );
      return;
    }

    if (!formData.state.trim()) {
      setModalError(
        "Please specify your current agricultural operating state.",
      );
      return;
    }

    if (selectedProduce.length === 0) {
      setModalError(
        "Please select at least one produce crop type from the grid selection.",
      );
      return;
    }

    const payload = {
      state: formData.state,
      specificLocationOrLandmark: formData.specificLocationOrLandmark,
      whatDoYouFarm: selectedProduce,
      preferredMarketDestination: formData.preferredMarketDestination,
      farmSize: formData.farmSize,
    };

    setLoading(true);
    setModalError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/farmKyc/create/${activeFarmerId}`,
        payload,
      );

      dispatch(authToken(response.data?.token));
      nav("/farmer/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);

      // Extract clean error message values returned by backend server
      const backendErrorMessage =
        error.response?.data?.message || error.message;
      setModalError(backendErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      {/* Pop-Up Error Modal Window */}
      {modalError && (
        <div
          className="fg-global-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="fg-error-modal-card"
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <FaTimesCircle
              style={{
                color: "#ef4444",
                fontSize: "48px",
                marginBottom: "16px",
              }}
            />
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "20px",
                color: "#111827",
                fontFamily: "sans-serif",
              }}
            >
              Profile Update Alert
            </h3>
            <p
              style={{
                margin: "0 0 20px 0",
                color: "#4b5563",
                fontSize: "14px",
                lineHeight: "1.5",
                fontFamily: "sans-serif",
              }}
            >
              {modalError}
            </p>
            <button
              onClick={() => setModalError(null)}
              style={{
                backgroundColor: "#111827",
                color: "#ffffff",
                border: "none",
                padding: "10px 24px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                width: "100%",
                fontFamily: "sans-serif",
              }}
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

      <div className="profile-wrapper">
        <div className="profile-header">
          <div className="logo-placeholder">
            <img
              className="sign-page-logo-img"
              src="/src/assets/logo.png"
              alt="Logo"
            />
          </div>

          <h2 className="profile-title">Complete Your Farmer Profile</h2>

          <p className="profile-subtitle">
            Tell us about your farm so we can match you with the right drivers
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="section-header">
              <div className="icon-box green">
                <FaUser size={20} />
              </div>

              <div>
                <h3 className="section-title">Farmer Details</h3>
                <p className="section-subtitle">Contact Information</p>
              </div>
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">First Name</label>
                <input
                  type="text"
                  value={profileData.firstName || ""}
                  disabled
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName || ""}
                  disabled
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input
                  type="text"
                  value={profileData.phoneNumber || ""}
                  disabled
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  value={profileData.email || ""}
                  disabled
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <div className="icon-box green">
                <FaMapMarkerAlt size={20} />
              </div>

              <div>
                <h3 className="section-title">Farm Location</h3>
                <p className="section-subtitle">Where is your farm located?</p>
              </div>
            </div>

            <div className="grid-2" style={{ marginBottom: "1rem" }}>
              <div className="input-group">
                <label className="input-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={loading}
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">LGA / Town</label>
                <input
                  type="text"
                  placeholder="e.g. Ikorodu, Ikeja"
                  disabled={loading}
                  className="form-input"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">
                Specific Location / Landmark
              </label>
              <input
                type="text"
                name="specificLocationOrLandmark"
                value={formData.specificLocationOrLandmark}
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g. Near Ogun River Bridge"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <div className="icon-box amber">
                <FaBox size={20} />
              </div>

              <div>
                <h3 className="section-title">What Do You Farm?</h3>
                <p className="section-subtitle">
                  Select all produce types you grow
                </p>
              </div>
            </div>

            <div className="produce-grid">
              {produceOptions?.map((item) => {
                if (!item) return null;

                const isSelected = selectedProduce.includes(item._id);

                return (
                  <button
                    key={item._id}
                    type="button"
                    disabled={loading}
                    onClick={() => toggleProduce(item._id)}
                    className={`produce-btn ${isSelected ? "selected" : ""}`}
                  >
                    {item.cropsName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <div className="icon-box blue">
                <FaChartLine size={20} />
              </div>

              <div>
                <h3 className="section-title">Preferred Market Destination</h3>
                <p className="section-subtitle">
                  Where do you usually sell your produce?
                </p>
              </div>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="preferredMarketDestination"
                value={formData.preferredMarketDestination}
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g. Mile 12 Market"
                className="form-input"
              />
            </div>
          </div>

          <div
            className="form-section"
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label className="section-title" style={{ fontSize: "0.875rem" }}>
              Farm Size
            </label>

            <div className="select-wrapper">
              <select
                name="farmSize"
                value={formData.farmSize}
                onChange={handleChange}
                disabled={loading}
                className="form-select"
              >
                <option value="">Select farm size</option>
                <option value="Small">Small (Less than 1 hectare)</option>
                <option value="Medium">Medium (1 - 5 hectares)</option>
                <option value="Large">Large (More than 5 hectares)</option>
              </select>

              <div className="select-icon">
                <FaChevronDown size={16} />
              </div>
            </div>
          </div>

          <div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Processing Profile..." : "Complete Profile"}
            </button>

            <p className="footer-text">
              You can update this information anytime from your profile settings
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerProfile;
