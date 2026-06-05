import React, { useState } from 'react';
import "../CSS/AgentHelpSupport2.css";
import { LuChevronDown } from "react-icons/lu";

const AgentHelpSupport2 = () => {
  const [issueType, setIssueType] = useState("Payment Issue");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ issueType, description });
  };

  return (
    <div className="agent-report-container">
      <form className="report-card-wrapper" onSubmit={handleSubmit}>
        <h2>Report an Issue</h2>

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

        <button type="submit" className="submit-report-btn">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default AgentHelpSupport2;