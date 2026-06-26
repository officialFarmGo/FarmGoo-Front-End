import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CameraOutlined,
  SaveOutlined,
  LockOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "../CSS/AgentProfilesetting.css";

const AgentProfileSettings = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user) || {};
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [modal, setModal] = useState({ visible: false, type: "", text: "" });
  const [isProfileEdited, setIsProfileEdited] = useState(false);

  // Sync state when Redux user profile data loads or changes
  useEffect(() => {
    setFormData({
      firstName: user.firstName || "Obi",
      lastName: user.lastName || "Amaka",
      email: user.email || "amaka@gmail.com",
      phoneNumber: user.phoneNumber || "+234 801 234 5678",
      password: "",
    });

    // Safely extract string URL from Cloudinary image object or alternative fallbacks
    const initialImage = user.profilePicture && typeof user.profilePicture === "object"
      ? user.profilePicture.securedUrl
      : user.profilePicture;

    setPreviewUrl(initialImage || "");
  }, [user]);

  // Memory cleanup for local file blob previews
  useEffect(() => {
    return () => {
      if (previewUrl && typeof previewUrl === "string" && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const closeModal = () => {
    setModal({ visible: false, type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const uploadFormPayload = new FormData();
    uploadFormPayload.append("firstName", formData.firstName.trim());
    uploadFormPayload.append("lastName", formData.lastName.trim());
    uploadFormPayload.append("email", formData.email.trim());
    uploadFormPayload.append("phoneNumber", formData.phoneNumber.trim());

    if (formData.password.trim()) {
      uploadFormPayload.append("password", formData.password);
    }

    if (selectedFile) {
      uploadFormPayload.append("profilePicture", selectedFile);
    }

    try {
      const res = await fetch(`${BaseUrl}/agentDashboard/updateProfile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
        body: uploadFormPayload,
      });

      const data = await res.json();

      if (res.ok) {
        const updatedUser = data.data || {};
        
        setStatusMessage({
          type: "success",
          text: data.message || "Successfully updated profile",
        });

        setModal({
          visible: true,
          type: "success",
          text: "🎉 Success! Your profile details have been successfully updated.",
        });

        setFormData((prev) => ({
          ...prev,
          firstName: updatedUser.firstName || prev.firstName,
          lastName: updatedUser.lastName || prev.lastName,
          email: updatedUser.email || prev.email,
          phoneNumber: updatedUser.phoneNumber || prev.phoneNumber,
          password: "",
        }));

        if (updatedUser.profilePicture?.securedUrl) {
          setPreviewUrl(updatedUser.profilePicture.securedUrl);
        }

        // Mark profile as edited – disable all fields so they can't be changed again
        setIsProfileEdited(true);
      } else {
        throw new Error(data.message || "Not successful");
      }
    } catch (err) {
      console.error("Profile update patch processing error:", err);
      setStatusMessage({ 
        type: "error", 
        text: err.message || "Profile update not successful." 
      });
      setModal({
        visible: true,
        type: "error",
        text: `❌ Update Not Successful: ${err.message || "Something went wrong."}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fg-profile-settings-view">
      <div className="fg-profile-header-stack">
        <h1 className="fg-profile-main-title">Profile Settings</h1>
        <p className="fg-profile-sub-title">Update your personal information</p>
        {isProfileEdited && (
          <p className="fg-profile-edited-notice">
            ✅ Your profile has been updated
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Picture Panel Section */}
        <div className="fg-profile-panel-card">
          <h3 className="fg-panel-inner-heading">Profile Picture</h3>
          <div className="fg-avatar-upload-row">
            <label
              htmlFor="avatarFileInput"
              className="fg-avatar-preview-circle"
              style={{ cursor: isProfileEdited ? "default" : "pointer" }}
            >
              {previewUrl && typeof previewUrl === "string" ? (
                <img
                  src={previewUrl}
                  alt="Avatar Preview"
                  className="fg-avatar-image-render"
                />
              ) : (
                <span>{formData.firstName?.charAt(0).toUpperCase()}</span>
              )}
              {!isProfileEdited && (
                <div className="fg-avatar-camera-overlay">
                  <CameraOutlined />
                </div>
              )}
            </label>
            <input
              type="file"
              id="avatarFileInput"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              disabled={isProfileEdited}
            />
            <div className="fg-upload-instructions-stack">
              {!isProfileEdited ? (
                <>
                  <label
                    htmlFor="avatarFileInput"
                    className="fg-upload-trigger-text"
                    style={{ cursor: "pointer" }}
                  >
                    Change Profile Picture
                  </label>
                  <span className="fg-upload-constraints-label">
                    JPG, PNG or GIF. Max size 2MB
                  </span>
                </>
              ) : (
                <span className="fg-upload-locked-text">
                  Profile picture is locked after update
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information Input Cards */}
        <div className="fg-profile-panel-card">
          <h3 className="fg-panel-inner-heading">Personal Information</h3>
          <div className="fg-form-two-column-grid">
            <div className="fg-form-input-group">
              <label className="fg-form-field-label">First Name</label>
              <div className={`fg-input-wrapper-inner ${isProfileEdited ? "fg-input-disabled" : ""}`}>
                <UserOutlined className="fg-input-field-vector-icon" />
                <input
                  type="text"
                  name="firstName"
                  className="fg-input-native-element"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={isProfileEdited}
                />
              </div>
            </div>

            <div className="fg-form-input-group">
              <label className="fg-form-field-label">Last Name</label>
              <div className={`fg-input-wrapper-inner ${isProfileEdited ? "fg-input-disabled" : ""}`}>
                <UserOutlined className="fg-input-field-vector-icon" />
                <input
                  type="text"
                  name="lastName"
                  className="fg-input-native-element"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={isProfileEdited}
                />
              </div>
            </div>

            <div className="fg-form-input-group">
              <label className="fg-form-field-label">Email Address</label>
              <div className={`fg-input-wrapper-inner ${isProfileEdited ? "fg-input-disabled" : ""}`}>
                <MailOutlined className="fg-input-field-vector-icon" />
                <input
                  type="email"
                  name="email"
                  className="fg-input-native-element"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isProfileEdited}
                />
              </div>
            </div>

            <div className="fg-form-input-group">
              <label className="fg-form-field-label">Phone Number</label>
              <div className={`fg-input-wrapper-inner ${isProfileEdited ? "fg-input-disabled" : ""}`}>
                <PhoneOutlined className="fg-input-field-vector-icon" />
                <input
                  type="text"
                  name="phoneNumber"
                  className="fg-input-native-element"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  disabled={isProfileEdited}
                />
              </div>
            </div>

            <div className="fg-form-input-group fg-full-width-column">
              <label className="fg-form-field-label">
                New Password (Leave empty if not changing)
              </label>
              <div className={`fg-input-wrapper-inner ${isProfileEdited ? "fg-input-disabled" : ""}`}>
                <LockOutlined className="fg-input-field-vector-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder={isProfileEdited ? "Locked" : "••••••••"}
                  className="fg-input-native-element"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isProfileEdited}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Alert Status Message Elements */}
        {statusMessage && !isProfileEdited && (
          <div className={`fg-profile-status-alert ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}

        {/* Form Action Section */}
        <div className="fg-form-actions-footer-row">
          <button
            type="submit"
            className="fg-btn-submit-save-solid"
            disabled={isSubmitting || isProfileEdited}
          >
            {isSubmitting ? (
              <div className="fg-profile-loading-spinner" />
            ) : (
              <>
                <SaveOutlined />
                <span>{isProfileEdited ? "Profile Locked" : "Save Changes"}</span>
              </>
            )}
          </button>
          <button
            type="button"
            className="fg-btn-cancel-action-outline"
            disabled={isSubmitting || isProfileEdited}
          >
            {isProfileEdited ? "Locked" : "Cancel"}
          </button>
        </div>
      </form>

      {/* Custom Popup Modal */}
      {modal.visible && (
        <div className="fg-modal-overlay" onClick={closeModal}>
          <div className="fg-modal-popup" onClick={(e) => e.stopPropagation()}>
           
            <div className={`fg-modal-icon ${modal.type}`}>
              {modal.type === "success" ? "✅" : "❌"}
            </div>
            <p className="fg-modal-text">{modal.text}</p>
            <button
              className={`fg-modal-action-btn ${modal.type}`}
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentProfileSettings;