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

  // Target the auth slice specifically rather than the entire global state store
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
          // If the backend directly sends delivery status totals inside an object or stats object
          const statsSource = fetchedData.stats || fetchedData;

          // Fallback parsing if backend returns raw deliveries array instead of metrics mapping
          if (Array.isArray(fetchedData.deliveries)) {
            const list = fetchedData.deliveries;
            setData({
              total: list.length,
              pending: list.filter((d) => d.status === "pending" || d.isDraft)
                .length,
              accepted: list.filter((d) => d.status === "accepted").length,
              inTransit: list.filter(
                (d) => d.status === "inTransit" || d.status === "in-transit",
              ).length,
              delivered: list.filter((d) => d.status === "delivered").length,
            });
          } else {
            // Mapping direct property matches from stats pipeline payload response
            setData({
              total: statsSource.total ?? statsSource.inProgress ?? 0,
              pending: statsSource.pending ?? 0,
              accepted: statsSource.accepted ?? 0,
              inTransit: statsSource.inTransit ?? 0,
              delivered: statsSource.delivered ?? 0,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching active delivery metrics details:", error);
      }
    };

    getAllDeliveries();
  }, [auth?.token]); // Hook triggers cleanly when token context updates

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
