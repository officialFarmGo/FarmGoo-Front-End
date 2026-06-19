import React, { useState, useEffect, useRef } from "react";
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
  const fileInputRef = useRef(null);

  // Keep a reference to the initial/saved profile data for when a user clicks 'Cancel'
  const [initialData, setInitialData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  const ENDPOINT = `${BASE_URL}/agentDashboard/updateProfile`;

  useEffect(() => {
    if (!token) {
      setErrors({ serverError: "No auth token found. Please log in again." });
      setFetchLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(ENDPOINT, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            console.warn(
              "GET /profile returned 404. Fallback enabled for PUT execution.",
            );
            return;
          }

          let message = "Could not fetch profile information from the server.";
          if (response.status === 401) {
            message = "Session expired. Please log in again.";
          }
          throw new Error(message);
        }

        const result = await response.json();

        if (result && result.data) {
          const profile = result.data;
          const loadedData = {
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            email: profile.email || "",
            phoneNumber: profile.phoneNumber || "",
            location: profile.location || profile.townOrVillage || "",
          };

          setInitialData(loadedData);
          setFormData(loadedData);

          if (profile.profilePicture) {
            const picUrl =
              typeof profile.profilePicture === "object"
                ? profile.profilePicture.securedUrl
                : profile.profilePicture;
            setImagePreview(picUrl || "");
          }
        }
      } catch (error) {
        console.error("[AgentProfile] Fetch error:", error.message);
        setErrors((prev) => ({
          ...prev,
          serverError:
            error.message ||
            "Cannot reach the server. Please check your connection.",
        }));
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProfileData();
  }, [ENDPOINT, token]);

  const getFullName = () => {
    if (!formData.firstName && !formData.lastName) return "";
    return `${formData.firstName} ${formData.lastName}`.trim();
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    const parts = value.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";

    setFormData((prev) => ({ ...prev, firstName, lastName }));

    if (errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image:
          "File size exceeds the 2MB limit. Please choose a smaller image.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, image: "" }));
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) {
      tempErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Enter a valid email address";
    }
    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone number is required";
    }
    if (!formData.location.trim()) {
      tempErrors.location = "Location is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage("");
    setErrors((prev) => ({ ...prev, serverError: "" }));

    const submissionData = new FormData();
    submissionData.append("firstName", formData.firstName);
    submissionData.append("lastName", formData.lastName);
    submissionData.append("email", formData.email);
    submissionData.append("phoneNumber", formData.phoneNumber);
    submissionData.append("location", formData.location);
    submissionData.append("townOrVillage", formData.location);

    if (imageFile) {
      submissionData.append("profilePicture", imageFile);
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submissionData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || result?.error || "Failed to update profile.",
        );
      }

      if (result && result.data) {
        const updatedProfile = result.data;
        const freshData = {
          firstName: updatedProfile.firstName || "",
          lastName: updatedProfile.lastName || "",
          email: updatedProfile.email || "",
          phoneNumber: updatedProfile.phoneNumber || "",
          location:
            updatedProfile.location || updatedProfile.townOrVillage || "",
        };

        setInitialData(freshData);
        setFormData(freshData);

        if (updatedProfile.profilePicture?.securedUrl) {
          setImagePreview(updatedProfile.profilePicture.securedUrl);
        }

        setSuccessMessage("Profile updated successfully!");
        setImageFile(null);
        setTimeout(() => setSuccessMessage(""), 4000);
      }
    } catch (error) {
      console.error("[AgentProfile] Update error:", error);
      setErrors({
        serverError:
          error.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Revert form back to the last saved database version instead of wiping it out entirely
    setFormData(initialData);
    setImageFile(null);
    if (initialData.profilePicture) {
      setImagePreview(initialData.profilePicture);
    }
    setErrors({});
  };

  // Layout Blueprint
  const formFieldsConfig = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      placeholder: "e.g. John Doe",
      value: getFullName(),
      onChange: handleFullNameChange,
      icon: <UserOutlined className="fg-input-field-vector-icon" />,
      readOnly: false,
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "name@example.com",
      value: formData.email,
      onChange: handleChange,
      icon: <MailOutlined className="fg-input-field-vector-icon" />,
      readOnly: false,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "text",
      placeholder: "e.g. 09024156005",
      value: formData.phoneNumber,
      onChange: handleChange,
      icon: <PhoneOutlined className="fg-input-field-vector-icon" />,
      readOnly: false, // <-- CHANGED: Turned readOnly off
    },
    {
      label: "Location / Town",
      name: "location",
      type: "text",
      placeholder: "e.g. Ikorodu",
      value: formData.location,
      onChange: handleChange,
      icon: <EnvironmentOutlined className="fg-input-field-vector-icon" />,
      readOnly: false,
    },
  ];

  if (fetchLoading) {
    return (
      <div className="fg-profile-settings-view">
        <div className="fg-profile-header-stack">
          <h1 className="fg-profile-main-title">Profile Settings</h1>
          <p className="fg-profile-sub-title">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fg-profile-settings-view">
      <div className="fg-profile-header-stack">
        <h1 className="fg-profile-main-title">Profile Settings</h1>
        <p className="fg-profile-sub-title">Update your personal information</p>
      </div>

      {errors.serverError && (
        <div className="error-message server-error">{errors.serverError}</div>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Profile Picture Panel */}
        <div className="fg-profile-panel-card">
          <h3 className="fg-panel-inner-heading">Profile Picture</h3>
          <div className="fg-avatar-upload-row">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg, image/gif"
              style={{ display: "none" }}
            />

            <div
              className="fg-avatar-container-wrapper"
              onClick={handleCameraClick}
            >
              <div className="fg-avatar-preview-circle">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" />
                ) : (
                  <span>
                    {formData.firstName
                      ? formData.firstName.charAt(0).toUpperCase()
                      : "O"}
                  </span>
                )}
              </div>
              <div className="fg-avatar-camera-overlay">
                <CameraOutlined />
              </div>
            </div>

            <div className="fg-upload-instructions-stack">
              <span
                className="fg-upload-trigger-text"
                onClick={handleCameraClick}
              >
                Change Profile Picture
              </span>
              <span className="fg-upload-constraints-label">
                JPG, PNG or GIF. Max size 2MB
              </span>
              {errors.image && (
                <span className="error-text">{errors.image}</span>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Personal Information Fields */}
        <div className="fg-profile-panel-card">
          <h3 className="fg-panel-inner-heading">Personal Information</h3>
          <div className="fg-form-two-column-grid">
            {formFieldsConfig.map((field) => (
              <div className="fg-form-input-group" key={field.name}>
                <label className="fg-form-field-label">{field.label}</label>
                <div
                  className={`fg-input-wrapper-inner ${errors[field.name] ? "input-error-border" : ""} ${
                    field.readOnly ? "fg-input-disabled" : ""
                  }`}
                >
                  {field.icon}
                  <input
                    type={field.type}
                    name={field.name}
                    className="fg-input-native-element"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    readOnly={field.readOnly}
                  />
                </div>
                {errors[field.name] && (
                  <span className="error-text">{errors[field.name]}</span>
                )}
                {field.note && field.note}
              </div>
            ))}
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
            onClick={handleCancel}
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
