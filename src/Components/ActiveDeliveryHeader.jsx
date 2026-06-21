import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { LuSearch, LuFilter } from "react-icons/lu";
import "../CSS/ActiveDeliveryHeader.css";

const ActiveDeliveryHeader = ({ onSearchChange, onFilterClick }) => {
  const [data, setData] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    inTransit: 0,
    delivered: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Safely target the auth slice
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const getAllDeliveries = async () => {
      const BASE_URL = import.meta.env.VITE_BaseUrl;
      const token = localStorage.getItem("token") || auth?.token;

      if (!BASE_URL) {
        console.error("API Base URL is missing. Check your .env file.");
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/agentDashboard/getAlldeliveries`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const fetchedData = response.data?.data || response.data;

        if (fetchedData) {
          const statsSource = fetchedData.stats || fetchedData;

          // Fallback parsing if backend returns raw array instead of structural counters
          if (
            Array.isArray(fetchedData.deliveries) ||
            Array.isArray(fetchedData)
          ) {
            const list = fetchedData.deliveries || fetchedData;

            setData({
              total: list.length,
              pending: list.filter((d) => {
                const s = d.status?.toLowerCase();
                return s === "pending" || d.isDraft;
              }).length,
              accepted: list.filter(
                (d) => d.status?.toLowerCase() === "accepted",
              ).length,
              inTransit: list.filter((d) => {
                const s = d.status?.toLowerCase();
                return (
                  s === "intransit" || s === "in transit" || s === "in-transit"
                );
              }).length,
              delivered: list.filter(
                (d) => d.status?.toLowerCase() === "delivered",
              ).length,
            });
          } else {
            // Direct property mapping
            setData({
              total: statsSource.total ?? statsSource.inProgress ?? 0,
              pending: statsSource.pending ?? 0,
              accepted: statsSource.accepted ?? 0,
              inTransit: statsSource.inTransit ?? statsSource.in_transit ?? 0,
              delivered: statsSource.delivered ?? 0,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching active delivery metrics details:", error);
      }
    };

    getAllDeliveries();
  }, [auth?.token]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearchChange) {
      onSearchChange(query); // Bubbles search queries up to your container component
    }
  };

  const tabsConfig = [
    {
      id: "total",
      label: "Total",
      value: data.total,
      cardClass: "border-grey",
      labelClass: "text-grey",
      valueClass: "text-black",
    },
    {
      id: "pending",
      label: "Pending",
      value: data.pending,
      cardClass: "bg-amber border-amber",
      labelClass: "text-amber",
      valueClass: "text-amber",
    },
    {
      id: "accepted",
      label: "Accepted",
      value: data.accepted,
      cardClass: "bg-blue border-blue",
      labelClass: "text-blue",
      valueClass: "text-blue",
    },
    {
      id: "inTransit",
      label: "In Transit",
      value: data.inTransit,
      cardClass: "bg-purple border-purple",
      labelClass: "text-purple",
      valueClass: "text-purple",
    },
    {
      id: "delivered",
      label: "Delivered",
      value: data.delivered,
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
        <div className="search-input-box">
          <LuSearch className="search-bar-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by ID, produce, location, or driver..."
          />
        </div>

        <LuFilter className="standalone-filter-icon" onClick={onFilterClick} />

        <button
          type="button"
          className="filter-action-btn"
          onClick={onFilterClick}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default ActiveDeliveryHeader;
