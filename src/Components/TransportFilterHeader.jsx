import React from "react";
import { SearchOutlined, DownOutlined, ControlOutlined } from "@ant-design/icons";
import "../CSS/TransportFilterHeader.css";

const TransportFilterHeader = () => {
  return (
    <div className="fg-transport-header-container">
      <h1 className="fg-transport-main-title">Available Transport Jobs</h1>
      <p className="fg-transport-subtitle">Browse and accept transport requests from verified farmers</p>
      
      <div className="fg-filter-control-bar">
        <div className="fg-search-box-wrapper">
          <SearchOutlined style={{ color: "#9ca3af", fontSize: "16px" }} />
          <input 
            type="text" 
            placeholder="Search by produce, location..." 
            className="fg-filter-input"
          />
        </div>
        
        <div className="fg-dropdown-control">
          <span>Nearest First</span>
          <DownOutlined style={{ fontSize: "12px", color: "#6b7280" }} />
        </div>

        <div className="fg-dropdown-control">
          <span>All Jobs</span>
          <DownOutlined style={{ fontSize: "12px", color: "#6b7280" }} />
        </div>
      </div>

      <div className="fg-meta-count-row">
        <span className="fg-jobs-count-text">
          <strong className="fg-count-highlight">6</strong> jobs available
        </span>
        <button className="fg-more-filters-btn">
          <ControlOutlined style={{ fontSize: "14px" }} />
          <span>More Filters</span>
        </button>
      </div>
    </div>
  );
};

export default TransportFilterHeader;