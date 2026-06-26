import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "../CSS/AgentHelpSupport2.css";
import { LuChevronDown } from "react-icons/lu";

const AgentHelpSupport2 = () => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const [issueType, setIssueType] = useState("Payment Issue");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!description.trim()) {
      setErrorMsg("Please describe the issue before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${BaseUrl}/support/createReport`, {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issueType,
          description: description.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit report");

      setSuccessMsg("Report submitted successfully! We'll get back to you shortly.");
      setDescription("");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="agent-report-container">
      <form className="report-card-wrapper" onSubmit={handleSubmit}>
        <h2>Report an Issue</h2>

        {successMsg && (
          <div className="report-success-msg" style={{ padding: "12px 16px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", color: "#166534", fontSize: "14px", marginBottom: "16px", fontWeight: 500 }}>
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="report-error-msg" style={{ padding: "12px 16px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "14px", marginBottom: "16px", fontWeight: 500 }}>
            {errorMsg}
          </div>
        )}

        <div className="form-group-block">
          <label htmlFor="issueType">Issue Type</label>
          <div className="select-input-wrapper">
            <select
              id="issueType"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option value="Payment Issue">Payment Issue</option>
              <option value="Logistics Issue">Logistics Issue</option>
              <option value="Account Issue">Account Issue</option>
              <option value="Other">Other</option>
            </select>
            <LuChevronDown className="select-dropdown-icon" />
          </div>
        </div>

        <div className="form-group-block">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>

        <button type="submit" className="submit-report-btn" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default AgentHelpSupport2;