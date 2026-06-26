import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "../CSS/ProfileSettingsDashboard.css";
import { useNavigate } from "react-router-dom";

const ProfileSettingsDashboard = ({ onBack }) => {
  const nav = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user); // Pulling user object directly from Redux
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    farmSize: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (user) {
      const mergedFullName = [user.firstName, user.lastName]
        .filter(Boolean)
        .join(" ");

      setForm({
        fullName: mergedFullName,
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        location: user.townOrVillage || "",
        farmSize: user.farmSize || "",
      });

      if (user.profilePicture) {
        setAvatarPreview(user.profilePicture);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const body = new FormData();

      if (form.fullName.trim()) {
        const nameParts = form.fullName.trim().split(/\s+/);
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        if (firstName) body.append("firstName", firstName);
        if (lastName) body.append("lastName", lastName);
      }

      if (form.email) body.append("email", form.email);
      if (form.location) body.append("townOrVillage", form.location);
      if (form.farmSize) body.append("farmSize", form.farmSize);

      if (avatar) {
        body.append("profilePicture", avatar);
      }

      const res = await fetch(`${BaseUrl}/farmerDash/updateFarmer`, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${token}` 
        },
        body,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setStatus({ type: "success", msg: data.message || "Profile updated!" });
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    } finally {
      setSaving(false);
    }
  };

  const initials = form.fullName
    ? form.fullName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "J";

  return (
    <div className="ep-page">
      <div className="ep-container">

        <div className="ep-page-header">
          <div>
            <h1 className="ep-page-title">Edit Profile</h1>
            <p className="ep-page-sub">Update your personal information</p>
          </div>
        
        </div>

        <div className="ep-card">
          <h2 className="ep-card-title">Profile Picture</h2>
          <div className="ep-avatar-row">
            <div className="ep-avatar-wrap" onClick={() => fileInputRef.current.click()}>
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar" className="ep-avatar-img" />
              ) : (
                <div className="ep-avatar-initials">{initials}</div>
              )}
              <div className="ep-avatar-camera">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
            </div>
            <div>
              <p className="ep-avatar-label">Change Profile Picture</p>
              <p className="ep-avatar-hint">JPG, PNG or GIF. Max size 2MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        <div className="ep-card">
          <h2 className="ep-card-title">Personal Information</h2>
          <div className="ep-form-grid">
            <div className="ep-field">
              <label>Full Name</label>
              <div className="ep-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Jola Ogeremu"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="ep-field">
              <label>Email Address</label>
              <div className="ep-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="jola.o@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="ep-field">
              <label>Phone Number</label>
              <div className="ep-input-wrap ep-input-disabled">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.88a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="+234 801 234 5678"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <p className="ep-phone-note">
                Phone number cannot be changed here.{" "}
                <button type="button" className="ep-change-phone-btn">Change phone number</button>
              </p>
            </div>

            <div className="ep-field">
              <label>Location</label>
              <div className="ep-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <input
                  type="text"
                  name="location"
                  placeholder="Apapa, Lagos"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ep-card">
          <h2 className="ep-card-title">Farm Information</h2>
          <div className="ep-field">
            <label>Farm Size</label>
            <div className="ep-select-wrap">
              <select name="farmSize" value={form.farmSize} onChange={handleChange}>
                <option value="">Select farm size</option>
                <option value="small">Small (under 5 acres)</option>
                <option value="medium">Medium (5–20 acres)</option>
                <option value="large">Large (20–100 acres)</option>
                <option value="commercial">Commercial (100+ acres)</option>
              </select>
              <svg className="ep-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </div>

        {status && (
          <div className={`ep-status ${status.type}`}>{status.msg}</div>
        )}

        <div className="ep-actions">
          <button type="button" className="ep-save-btn" onClick={handleSave} disabled={saving}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" className="ep-cancel-btn" onClick={onBack}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileSettingsDashboard;