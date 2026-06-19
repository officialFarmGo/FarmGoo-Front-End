import React from "react";
import "../CSS/ActiveDeliveryHeader.css";
import { LuSearch, LuFilter } from "react-icons/lu";

const ActiveDeliveryHeader = ({ data }) => {
  return (
    <div className="manage-deliveries-container">
      <div className="manage-header-block">
        <h1>Active Deliveries</h1>
        <p>Manage and track all your transport requests</p>
      </div>

      <div className="status-cards-row">
        <div className="status-tab-card border-grey">
          <span className="status-tab-label text-grey">Total</span>
          <span className="status-tab-value text-black">{data?.total}</span>
        </div>

        <div className="status-tab-card bg-amber border-amber">
          <span className="status-tab-label text-amber">Pending</span>
          <span className="status-tab-value text-amber">{data?.pending}</span>
        </div>

        <div className="status-tab-card bg-blue border-blue">
          <span className="status-tab-label text-blue">Accepted</span>
          <span className="status-tab-value text-blue">{data?.Accepted}</span>
        </div>

        {/* <div className="status-tab-card bg-purple border-purple">
          <span className="status-tab-label text-purple">In Transit</span>
          <span className="status-tab-value text-purple">2</span>
        </div> */}

        <div className="status-tab-card bg-green border-green">
          <span className="status-tab-label text-green">Delivered</span>
          <span className="status-tab-value text-green">{data?.Delivered}</span>
        </div>
      </div>

      <div className="search-filter-wrapper">
        <div
          className="search-input-box"
          data-placeholder="Search by ID, produce, location, or driver..."
        >
          <LuSearch className="search-bar-icon" />
          <input
            type="text"
            placeholder="Search by ID, produce, location, or driver..."
          />
        </div>

        <LuFilter className="standalone-filter-icon" />

        <button type="button" className="filter-action-btn">
          Filter
        </button>
      </div>
    </div>
  );
};

export default ActiveDeliveryHeader;
