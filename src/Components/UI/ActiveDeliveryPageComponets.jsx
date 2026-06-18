import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ActiveDeliveryNotification from "../ActiveDeliveryNotification";
import ActiveDeliveryHeader from "../ActiveDeliveryHeader";


const ActiveDeliveryPageComponets = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [status, setStatus] = useState({ total: 0, pending: 0, Accepted: 0, Delivered: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      setError("Authentication token missing.");
      setLoading(false);
      return;
    }

    const abortController = new AbortController();

    const fetchDeliveries = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/farmerDash/activeDeliveries`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: abortController.signal,
          }
        );

        const data = response.data.data;
        setDeliveries(data.activeDeliveries || []);
        setStatus(data.status || { total: 0, pending: 0, Accepted: 0, Delivered: 0 });
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching deliveries:", err);
        setError(err.response?.data?.message || err.message || "Failed to load deliveries.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
    return () => abortController.abort();
  }, [token, BaseUrl]);

  if (loading) {
    return <div className="loading-state">Loading active deliveries...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  return (
    <div className="active-deliveries-page">
      {/* Pass status counts to header */}
      <ActiveDeliveryHeader status={status} />

      <div className="delivery-list">
        {deliveries.length === 0 ? (
          <p className="no-deliveries">No active deliveries found.</p>
        ) : (
          deliveries.map((delivery) => (
            <ActiveDeliveryNotification key={delivery._id} delivery={delivery} />
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveDeliveryPageComponets;