import React from "react";
import { Search, ChevronDown } from "lucide-react";
import "../CSS/TransportJob.css";

const TransportJob = () => {
  return (
    <div className="transport-job-container">
      {/* Header Info */}
      <div className="tj-header-group">
        <h1 className="tj-main-title">Available Transport Jobs</h1>
        <p className="tj-sub-text">
          Browse and accept transport requests from verified farmers
        </p>
      </div>

      {/* Filter Bar Card */}
      <div className="tj-filter-card">
        <div className="tj-search-wrapper">
          <Search className="tj-search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by produce, location..."
            className="tj-search-input"
          />
        </div>

        <div className="tj-dropdown-group">
          <div className="tj-select-wrapper">
            <select className="tj-filter-select">
              <option value="nearest">Nearest First</option>
              <option value="farthest">Farthest First</option>
            </select>
            <ChevronDown className="tj-select-arrow" size={16} />
          </div>

          <div className="tj-select-wrapper">
            <select className="tj-filter-select">
              <option value="all">All Jobs</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown className="tj-select-arrow" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportJob;