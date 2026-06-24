import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ArrowRightOutlined,
  StarFilled,
  CheckCircleOutlined,
  DollarOutlined,
  CarOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../CSS/AvailableJobsAndWidgets.css";

const AvailableJobsAndWidgets = () => {
  const token = useSelector((state) => state.auth.token);
  const nav = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  const [wallet, setWallet] = useState(null);
  const [deliveryStats, setDeliveryStats] = useState(null);
  const [driver, setDriver] = useState(null);

  const BASE_URL = import.meta.env.VITE_BaseUrl;

  useEffect(() => {
    if (!token) return;

    const fetchJobs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/driverDash/getAvailableJobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setJobs((data.data.jobs ?? []).slice(0, 2));
      } catch (err) {
        console.error(err);
      } finally {
        setJobsLoading(false);
      }
    };

    const fetchWallet = async () => {
      try {
        const res = await fetch(`${BASE_URL}/driverDash/driverWallet`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setWallet(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDeliveries = async () => {
      try {
        const res = await fetch(`${BASE_URL}/driverDash/driverDeliveries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setDeliveryStats(data.data.stats);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDriver = async () => {
      try {
        const res = await fetch(`${BASE_URL}/driverDash/getOneDriver`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setDriver(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
    fetchWallet();
    fetchDeliveries();
    fetchDriver();
  }, [token]);

  return (
    <div className="fg-bottom-layout-container">

      <div className="fg-jobs-panel-card">
        <div className="fg-jobs-panel-header">
          <div className="fg-jobs-header-title">
            <h2 className="fg-jobs-main-heading">Available Jobs Near You</h2>
            <span className="fg-jobs-sub-heading">New transport requests from farmers</span>
          </div>
          <button className="fg-browse-all-btn" onClick={() => nav("jobss")}>
            Browse All Jobs <ArrowRightOutlined style={{ fontSize: "12px", marginLeft: "6px" }} />
          </button>
        </div>

        <div className="fg-jobs-list-stack">
          {jobsLoading && <p>Loading jobs...</p>}

          {!jobsLoading && jobs.length === 0 && (
            <p>No available jobs at the moment.</p>
          )}

          {!jobsLoading && jobs.map((job) => (
            <div key={job._id || job.deliveryId} className="fg-job-row-item">
              <div className="fg-job-item-left">
                <h3 className="fg-job-item-title">{job.productType}</h3>
                <span className="fg-job-item-specs">
                  {job.quantity} {job.weight} • {job.estimatedDuration}
                </span>
                <div className="fg-job-route-row">
                  <span className="fg-job-route-point">{job.pickup.address}</span>
                  <ArrowRightOutlined style={{ fontSize: "12px", color: "#6b7280" }} />
                  <span className="fg-job-route-point">{job.destination}</span>
                </div>
                <div className="fg-job-rating-row">
                  <StarFilled style={{ color: "#eab308", fontSize: "14px" }} />
                  <span className="fg-job-rating-text">
                    <strong>Verified</strong> {job.owner?.type || "Owner"}
                  </span>
                </div>
              </div>
              <div className="fg-job-item-right">
                <span className="fg-job-payout-text">{job.estimatedPayout}</span>
                <button
                  className="fg-job-details-btn"
                  onClick={() => nav("/job-details", { state: { job } })}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fg-footer-widgets-grid">

        <div className="fg-footer-widget-card">
          <div className="fg-widget-top-row">
            <div className="fg-widget-icon-box bg-green-light">
              <CheckCircleOutlined style={{ fontSize: "18px", color: "#16a34a" }} />
            </div>
            <div className="fg-widget-title-block">
              <span className="fg-widget-label">Completed This Week</span>
              <span className="fg-widget-main-value">
                {deliveryStats ? deliveryStats.completed : "--"}
              </span>
            </div>
          </div>
          <span className="fg-widget-growth-indicator">
            {deliveryStats ? `${deliveryStats.active} active • Avg ETA ${deliveryStats.avgETA}` : "Loading..."}
          </span>
        </div>

        <div className="fg-footer-widget-card justify-widget-content">
          <div className="fg-widget-top-row">
            <div className="fg-widget-icon-box bg-gray-light">
              <DollarOutlined style={{ fontSize: "18px", color: "#4b5563" }} />
            </div>
            <div className="fg-widget-title-block">
              <span className="fg-widget-label">Wallet Balance</span>
              <span className="fg-widget-main-value">
                {wallet ? `₦${Number(wallet.availableBalance).toLocaleString()}` : "--"}
              </span>
            </div>
          </div>
          <button className="fg-widget-action-btn" onClick={() => nav("/driver/wallet")}>
            Manage Wallet
          </button>
        </div>

        <div className="fg-footer-widget-card">
          <div className="fg-widget-top-row">
            <div className="fg-widget-icon-box bg-blue-light">
              <CarOutlined style={{ fontSize: "18px", color: "#2563eb" }} />
            </div>
            <div className="fg-widget-title-block">
              <span className="fg-widget-label">Vehicle Status</span>
              <span className={driver?.isAvailable ? "fg-widget-status-active" : "fg-widget-status-inactive"}>
                {driver ? (driver.isAvailable ? "Active & Ready" : "Unavailable") : "--"}
              </span>
            </div>
          </div>
          <span className="fg-widget-footer-meta">
            {driver ? `${driver.townOrVillage} • ${driver.firstName} ${driver.lastName}` : "Loading..."}
          </span>
        </div>

      </div>

    </div>
  );
};

export default AvailableJobsAndWidgets;