import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CameraOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import "../CSS/AgentProfilesetting.css";

const AgentProfileSettings = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    farmSize: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/agent/getProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.data) {
          const profile = response.data.data;
          setFormData({
            fullName: profile.fullName || "",
            email: profile.email || "",
            phoneNumber: profile.phoneNumber || "",
            location: profile.location || "",
            farmSize: profile.farmSize || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [BASE_URL, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+234|0)[789][01]\d{8}$/;

    if (!formData.fullName.trim())
      tempErrors.fullName = "Full name is required";

    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ""))) {
      tempErrors.phoneNumber = "Enter a valid Nigerian phone number";
    }

    if (!formData.location.trim()) tempErrors.location = "Location is required";
    if (!formData.farmSize) tempErrors.farmSize = "Please select a farm size";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/agent/updateProfile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
      if (error.response?.data?.message) {
        setErrors({ serverError: error.response.data.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const formFieldsConfig = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      icon: <UserOutlined className="fg-input-field-vector-icon" />,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      icon: <MailOutlined className="fg-input-field-vector-icon" />,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      icon: <PhoneOutlined className="fg-input-field-vector-icon" />,
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      icon: <EnvironmentOutlined className="fg-input-field-vector-icon" />,
    },
  ];

  return (
    <div className="fg-profile-settings-view">
      <div className="fg-profile-header-stack">
        <h1 className="fg-profile-main-title">Profile Settings</h1>
        <p className="fg-profile-sub-title">Update your personal information</p>
      </div>

      {errors.serverError && (
        <div className="error-message server-error">{errors.serverError}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="fg-profile-panel-card">
          <h3 className="fg-panel-inner-heading">Profile Picture</h3>
          <div className="fg-avatar-upload-row">
            <div className="fg-avatar-preview-circle">
              <span>
                {formData.fullName
                  ? formData.fullName.charAt(0).toUpperCase()
                  : "U"}
              </span>
              <div className="fg-avatar-camera-overlay">
                <CameraOutlined />
              </div>
            </div>
            <div className="fg-upload-instructions-stack">
              <span className="fg-upload-trigger-text">
                Change Profile Picture
              </span>
              <span className="fg-upload-constraints-label">
                JPG, PNG or GIF. Max size 2MB
              </span>
            </div>
          </div>
        </div>

        <div className="fg-profile-panel-card">
          <h3 className="fg-panel-inner-heading">Personal Information</h3>
          <div className="fg-form-two-column-grid">
            {formFieldsConfig.map((field) => (
              <div key={field.name} className="fg-form-input-group">
                <label className="fg-form-field-label">{field.label}</label>
                <div
                  className={`fg-input-wrapper-inner ${errors[field.name] ? "input-error-border" : ""}`}
                >
                  {field.icon}
                  <input
                    type={field.type}
                    name={field.name}
                    className="fg-input-native-element"
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                </div>
                {errors[field.name] && (
                  <span className="error-text">{errors[field.name]}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="fg-profile-panel-card">
          <h3 className="fg-panel-inner-heading">Farm Information</h3>
          <div className="fg-form-input-group">
            <label className="fg-form-field-label">Farm Size</label>
            <div className={errors.farmSize ? "input-error-border" : ""}>
              <select
                name="farmSize"
                className="fg-select-native-element"
                value={formData.farmSize}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select farm size
                </option>
                <option value="small">Small Scale (1-5 Hectares)</option>
                <option value="medium">Medium Scale (5-20 Hectares)</option>
                <option value="large">Large Scale (20+ Hectares)</option>
              </select>
            </div>
            {errors.farmSize && (
              <span className="error-text">{errors.farmSize}</span>
            )}
          </div>
        </div>

        <div className="fg-form-actions-footer-row">
          <button
            type="submit"
            className="fg-btn-submit-save-solid"
            disabled={loading}
          >
            <SaveOutlined />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
          <button
            type="button"
            className="fg-btn-cancel-action-outline"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentProfileSettings;
