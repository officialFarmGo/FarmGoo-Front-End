import { useState } from "react";
import {
  FaBox,
  FaChartLine,
  FaChevronDown,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import "../../CSS/FarmerProfile.css";

const FarmerProfile = () => {
  const [selectedProduce, setSelectedProduce] = useState([]);

  const produceOptions = [
    "Tomatoes",
    "Peppers",
    "Onions",
    "Cassava",
    "Yam",
    "Rice",
    "Maize",
    "Plantain",
    "Vegetables",
    "Fruits",
    "Grains",
    "Other",
  ];

  const toggleProduce = (item) => {
    if (selectedProduce.includes(item)) {
      setSelectedProduce(selectedProduce.filter((p) => p !== item));
    } else {
      setSelectedProduce([...selectedProduce, item]);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Header Section */}
        <div className="profile-header">
          <div className="logo-placeholder">
            <span style={{ fontFamily: "serif" }}>
              {" "}
              <img
                className="sign-page-logo-img"
                src="/src/assets/logo.png"
                alt="Logo"
              />
            </span>
          </div>
          <h2 className="profile-title">Complete Your Farmer Profile</h2>
          <p className="profile-subtitle">
            Tell us about your farm so we can match you with the right drivers
          </p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-text">
            <span>Step 2 of 2: Profile Setup</span>
            <span>Almost there!</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill"></div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={(e) => e.preventDefault()}>
          {/* SECTION 1: Farmer Details */}
          <div className="form-section">
            <div className="section-header">
              <div className="icon-box green">
                <FaUser size={20} />
              </div>
              <div>
                <h3 className="section-title">Farmer Details</h3>
                <p className="section-subtitle">contact information</p>
              </div>
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">First Name</label>
                <input type="text" placeholder="Jola" className="form-input" />
              </div>
              <div className="input-group">
                <label className="input-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Ogeremu"
                  className="form-input"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input
                  type="text"
                  placeholder="0801 234 5678"
                  className="form-input"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  placeholder="liaoreg@gmail.com"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Farm Location */}
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
                <input type="text" className="form-input" />
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
              <label className="input-label">
                Specific Location / Landmark
              </label>
              <input
                type="text"
                placeholder="e.g. Near Ogun River Bridge, Abeokuta Road"
                className="form-input"
              />
            </div>
          </div>

          {/* SECTION 3: What Do You Farm? */}
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
              {produceOptions.map((item) => {
                const isSelected = selectedProduce.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleProduce(item)}
                    className={`produce-btn ${isSelected ? "selected" : ""}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: Preferred Market Destination */}
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
                placeholder="e.g. Mile 12 Market, Bodija Market"
                className="form-input"
              />
            </div>
          </div>

          {/* SECTION 5: Farm Size */}
          <div
            className="form-section"
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label className="section-title" style={{ fontSize: "0.875rem" }}>
              Farm Size
            </label>
            <div className="select-wrapper">
              <select className="form-select">
                <option value="">Select farm size</option>
                <option value="small">Small (Less than 1 hectare)</option>
                <option value="medium">Medium (1 - 5 hectares)</option>
                <option value="large">Large (More than 5 hectares)</option>
              </select>
              <div className="select-icon">
                <FaChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Form Actions */}
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
