import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { LuSearch, LuFilter } from "react-icons/lu";
import "../CSS/ActiveDeliveryHeader.css";

const ActiveDeliveryHeader = () => {
  const [data, setData] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    inTransit: 0,
    delivered: 0,
  });

  const userToken = useSelector((state) => state);

  const getAllDeliveries = async () => {
    const BASE_URL = import.meta.env.VITE_BaseUrl;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${BASE_URL}/agentDashboard/getAlldeliveries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDeliveries();
  }, []);

  const tabsConfig = [
    {
      id: "total",
      label: "Total",
      value: data?.total || 0,
      cardClass: "border-grey",
      labelClass: "text-grey",
      valueClass: "text-black",
    },
    {
      id: "pending",
      label: "Pending",
      value: data?.pending || 0,
      cardClass: "bg-amber border-amber",
      labelClass: "text-amber",
      valueClass: "text-amber",
    },
    {
      id: "accepted",
      label: "Accepted",
      value: data?.accepted || 0,
      cardClass: "bg-blue border-blue",
      labelClass: "text-blue",
      valueClass: "text-blue",
    },
    {
      id: "inTransit",
      label: "In Transit",
      value: data?.inTransit || 0,
      cardClass: "bg-purple border-purple",
      labelClass: "text-purple",
      valueClass: "text-purple",
    },
    {
      id: "delivered",
      label: "Delivered",
      value: data?.delivered || 0,
      cardClass: "bg-green border-green",
      labelClass: "text-green",
      valueClass: "text-green",
    },
  ];

  return (
    <div className="manage-deliveries-container">
      <div className="manage-header-block">
        <h1>Active Deliveries</h1>
        <p>Manage and track all your transport requests</p>
      </div>

      <div className="status-cards-row">
        {tabsConfig.map((tab) => (
          <div key={tab.id} className={`status-tab-card ${tab.cardClass}`}>
            <span className={`status-tab-label ${tab.labelClass}`}>
              {tab.label}
            </span>
            <span className={`status-tab-value ${tab.valueClass}`}>
              {tab.value}
            </span>
          </div>
        ))}
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
