import React, { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import "../CSS/ReportIssue.css";

const ReportIssue = () => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Payment Issue');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const issueTypes = [
    'Payment Issue',
    'Delivery Problem',
    'Driver Complaint',
    'Technical Issue',
    'Other'
  ];

  const handleSelect = (type) => {
    setSelectedType(type);
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setStatusMessage({ type: "error", text: "Please enter a description before submitting." });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    // Matching your exact API request body structure
    const payload = {
      issueType: selectedType,
      description: description.trim()
    };

    try {
      const res = await fetch(`${BaseUrl}/support/createReport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "accept": "*/*"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage({ type: "success", text: data.message || "Report submitted successfully" });
        setDescription(''); // Clear textarea input on success
      } else {
        throw new Error(data.message || "Failed to submit report. Please try again.");
      }
    } catch (err) {
      console.error("Report Issue Error:", err);
      setStatusMessage({ type: "error", text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fg-issue-container">
      <div className="fg-issue-card">
        <h2 className="fg-issue-title">Report an Issue</h2>
        
        <form onSubmit={handleSubmit} className="fg-issue-form">
          <div className="fg-form-group">
            <label className="fg-input-label">Issue Type</label>
            <div className="fg-dropdown-wrapper">
              <button
                type="button"
                className="fg-dropdown-trigger"
                onClick={() => setIsOpen(!isOpen)}
                disabled={isSubmitting}
              >
                <span>{selectedType}</span>
                <LuChevronDown className="fg-dropdown-arrow" />
              </button>

              {isOpen && (
                <ul className="fg-dropdown-menu">
                  {issueTypes.map((type, index) => (
                    <li 
                      key={index}
                      className={`fg-dropdown-item ${selectedType === type ? 'selected' : ''}`}
                      onClick={() => handleSelect(type)}
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="fg-form-group">
            <label className="fg-input-label">Description</label>
            <textarea
              className="fg-textarea"
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          {statusMessage && (
            <div className={`fg-status-message ${statusMessage.type}`}>
              {statusMessage.text}
            </div>
          )}

          <button 
            type="submit" 
            className="fg-submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="fg-submit-spinner-container">
                <div className="fg-submit-spinner"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;