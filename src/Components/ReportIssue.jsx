import React, { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import "../CSS/ReportIssue.css"

const ReportIssue = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('Payment Issue')
  const [description, setDescription] = useState('')

  const issueTypes = [
    'Payment Issue',
    'Delivery Problem',
    'Driver Complaint',
    'Technical Issue',
    'Other'
  ]

  const handleSelect = (type) => {
    setSelectedType(type)
    setIsOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

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
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="fg-submit-btn">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReportIssue