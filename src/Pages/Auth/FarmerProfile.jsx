import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBox,
  FaChartLine,
  FaChevronDown,
  FaMapMarkerAlt,
  FaUser,
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

  const [formData, setFormData] = useState({
    state: "",
    specificLocationOrLandmark: "",
    preferredMarketDestination: "",
    farmSize: "",
  });

  const fetchProduceOptions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BaseUrl}/crop/getAllCrops`);
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

    const payload = {
      state: formData.state,
      specificLocationOrLandmark: formData.specificLocationOrLandmark,
      whatDoYouFarm: selectedProduce,
      preferredMarketDestination: formData.preferredMarketDestination,
      farmSize: formData.farmSize,
    };

    console.log("farmId:", farmId);
    console.log("Submitting payload:", payload);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BaseUrl}/farmKyc/create/${farmId}`,
        payload,
      );
      dispatch(authToken(response.data?.token));
      nav("/farmer/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="profile-container">
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
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label">LGA / Town</label>
                <input
                  type="text"
                  placeholder="e.g. Ikorodu, Ikeja"
                  className="form-input"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Specific Location / Landmark</label>
              <input
                type="text"
                name="specificLocationOrLandmark"
                value={formData.specificLocationOrLandmark}
                onChange={handleChange}
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
                <p className="section-subtitle">Select all produce types you grow</p>
              </div>
            </div>

            <div className="produce-grid">
              {produceOptions?.map((item) => {
  if (!item) return null;

  const isSelected =
    selectedProduce.includes(item._id);

  return (
    <button
      key={item._id}
      type="button"
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
                <p className="section-subtitle">Where do you usually sell your produce?</p>
              </div>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="preferredMarketDestination"
                value={formData.preferredMarketDestination}
                onChange={handleChange}
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
            <button type="submit" className="submit-btn">
              Complete Profile
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