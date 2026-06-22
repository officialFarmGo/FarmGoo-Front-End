import React, { useState } from "react";
import { HiOutlineUser, HiOutlineDocumentText, HiOutlineUpload } from "react-icons/hi";
import "../CSS/CompleteAgentProfile.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authToken } from "../LIB/AuthenticationSlice";
import toast, { Toaster } from "react-hot-toast";

const CompleteAgentProfile = () => {
  const agentId = useSelector((state) => state.auth.id);
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    agentFirstname: "",
    agentLastname: "",
    agentPhone: "",
    agentEmail: "",
    agentState: "",
    agentLgaTown: "",
    agentAddress: "",
    nokFirstname: "",
    nokLastname: "",
    nokPhone: "",
    nokEmail: "",
    nokRelationship: "",
    nokLgaTown: "",
    nokAddress: "",
  });

  const [verificationDocument, setVerificationDocument] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVerificationDocument(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("state", form.agentState);
      formData.append("residentialAddress", form.agentAddress);
      formData.append("kinsFirstName", form.nokFirstname);
      formData.append("kinsLastName", form.nokLastname);
      formData.append("kinsPhoneNumber", form.nokPhone);
      formData.append("kinsEmail", form.nokEmail);
      formData.append("kinsRelationship", form.nokRelationship);
      formData.append("kinsLgaOrTown", form.nokLgaTown);
      if (verificationDocument) {
        formData.append("verificationDocument", verificationDocument);
      }

      const res = await fetch(`${BaseUrl}/agentKyc/createDelivery/${agentId}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      dispatch(authToken(data.token));
      toast.success("Profile completed successfully!");
      navigate("/agent/dashboard");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cap-page-wrapper">
      <Toaster />
      <div className="cap-container">

        <div className="cap-top-branding">
          <div className="cap-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="cap-main-title">Complete Your Agent Profile</h1>
          <p className="cap-main-subtitle">Fill in your details to get verified and start operating as an agent.</p>
        </div>

        <div className="cap-progress-section">
          <div className="cap-progress-text">
            <span>Step 2 of 2: Profile Setup</span>
            <span>Almost there!</span>
          </div>
          <div className="cap-progress-bar-bg">
            <div className="cap-progress-bar-fill"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="cap-form">

          <div className="cap-card">
            <div className="cap-card-header">
              <div className="cap-header-icon-box">
                <HiOutlineUser size={20} />
              </div>
              <div>
                <h2>Agent Details</h2>
                <p>Contact information</p>
              </div>
            </div>

            <div className="cap-grid-2">
              <div className="cap-field">
                <label>First Name</label>
                <input type="text" name="agentFirstname" value={form.agentFirstname} onChange={handleChange} />
              </div>
              <div className="cap-field">
                <label>Last Name</label>
                <input type="text" name="agentLastname" value={form.agentLastname} onChange={handleChange} />
              </div>
            </div>

            <div className="cap-grid-2">
              <div className="cap-field">
                <label>Phone Number</label>
                <input type="tel" name="agentPhone" value={form.agentPhone} onChange={handleChange} />
              </div>
              <div className="cap-field">
                <label>Email</label>
                <input type="email" name="agentEmail" value={form.agentEmail} onChange={handleChange} />
              </div>
            </div>

            <div className="cap-grid-2">
              <div className="cap-field">
                <label>State</label>
                <input type="text" name="agentState" value={form.agentState} onChange={handleChange} />
              </div>
              <div className="cap-field">
                <label>LGA / Town</label>
                <input type="text" name="agentLgaTown" placeholder="e.g. Ikorodu, Ikeja" value={form.agentLgaTown} onChange={handleChange} />
              </div>
            </div>

            <div className="cap-field">
              <label>Residential Address</label>
              <input type="text" name="agentAddress" placeholder="e.g. Near Ogun River Bridge, Abeokuta Road" value={form.agentAddress} onChange={handleChange} />
            </div>
          </div>

          <div className="cap-card">
            <div className="cap-card-header">
              <div className="cap-header-icon-box">
                <HiOutlineUser size={20} />
              </div>
              <div>
                <h2>Next of Kin</h2>
                <p>Contact information</p>
              </div>
            </div>

            <div className="cap-grid-2">
              <div className="cap-field">
                <label>First Name</label>
                <input type="text" name="nokFirstname" value={form.nokFirstname} onChange={handleChange} />
              </div>
              <div className="cap-field">
                <label>Last Name</label>
                <input type="text" name="nokLastname" value={form.nokLastname} onChange={handleChange} />
              </div>
            </div>

            <div className="cap-grid-2">
              <div className="cap-field">
                <label>Phone Number</label>
                <input type="tel" name="nokPhone" value={form.nokPhone} onChange={handleChange} />
              </div>
              <div className="cap-field">
                <label>Email</label>
                <input type="email" name="nokEmail" value={form.nokEmail} onChange={handleChange} />
              </div>
            </div>

            <div className="cap-grid-2">
              <div className="cap-field">
                <label>Relationship</label>
                <input type="text" name="nokRelationship" value={form.nokRelationship} onChange={handleChange} />
              </div>
              <div className="cap-field">
                <label>LGA / Town</label>
                <input type="text" name="nokLgaTown" placeholder="e.g. Ikorodu, Ikeja" value={form.nokLgaTown} onChange={handleChange} />
              </div>
            </div>

            <div className="cap-field">
              <label>Residential Address</label>
              <input type="text" name="nokAddress" placeholder="e.g. Near Ogun River Bridge, Abeokuta Road" value={form.nokAddress} onChange={handleChange} />
            </div>
          </div>

          <div className="cap-card">
            <div className="cap-card-header">
              <div className="cap-header-icon-box cap-icon-green">
                <HiOutlineDocumentText size={20} />
              </div>
              <div>
                <h2>Verification Document</h2>
                <p>Upload a clear photo of your proof of Address (Utility Bill, Tenancy Agreement, etc.)</p>
              </div>
            </div>

            <div className="cap-upload-container">
              <label className="cap-upload-btn">
                <HiOutlineUpload size={16} />
                Choose File
                <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
              </label>
              {fileName && <span className="cap-file-name">{fileName}</span>}
            </div>
          </div>

          <button type="submit" className="cap-submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Complete Profile"}
          </button>
        </form>

        <p className="cap-footer-text">
          You can update this information anytime from your profile settings
        </p>

      </div>
    </div>
  );
};

export default CompleteAgentProfile;