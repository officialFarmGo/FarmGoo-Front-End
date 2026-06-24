import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiArrowLeft,
  FiBell,
  FiMapPin,
  FiShield,
  FiClock,
  FiEye,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import "../CSS/DriverJobDetails.css";

const BASE_URL = import.meta.env.VITE_BaseUrl;

const DriverJobDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  // Full job object passed from TransportJob
  const passedJob = location.state?.job;

  const [job, setJob] = useState(passedJob ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [accepting, setAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState(null);
  const [accepted, setAccepted] = useState(false);

  // Resolve the correct ID to use for the detail + accept endpoints
  const resolvedId = job?.deliveryId || job?.trackingId || job?._id;

  // ── Optionally re-fetch full details if the list didn't include everything ──
  useEffect(() => {
    if (!passedJob) {
      setError("No job selected. Please go back and pick a job.");
      return;
    }

    if (!passedJob.pickupDate && resolvedId) {
      setLoading(true);
      const fetchDetails = async () => {
        try {
          const res = await fetch(
            `${BASE_URL}/driverDash/getTheJobDetails/${resolvedId}`,
            {
              headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            const fetched = data.data?.job ?? data.data ?? data;
            setJob((prev) => ({ ...prev, ...fetched }));
          }
        } catch (_) {
          // Silent — passedJob is sufficient fallback
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, []);

  // ── Accept delivery ──────────────────────────────────────────────────────
  const handleAccept = async () => {
    setAccepting(true);
    setAcceptError(null);
    try {
      const res = await fetch(
        `${BASE_URL}/delivery/accept-Delivery/${resolvedId}`,
        {
          method: "PATCH",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Request failed (${res.status})`);
      }
      setAccepted(true);
    } catch (err) {
      setAcceptError(err.message);
    } finally {
      setAccepting(false);
    }
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  const initials = (name = "") =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const timeAgo = (iso) => {
    if (!iso) return "—";
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / 36e5);
    if (h < 1) return "Just now";
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  // ── Render states ────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="fg-job-page-wrapper">
        <div className="fg-job-state-box fg-job-error">
          <FiAlertCircle size={32} />
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="fg-job-back-btn">
            <FiArrowLeft /> Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="fg-job-page-wrapper">
        <div className="fg-job-state-box fg-job-success">
          <FiCheckCircle size={48} />
          <h2>Job Accepted!</h2>
          <p>
            You have successfully accepted the delivery of{" "}
            <strong>{job?.productType}</strong>. The farmer will be notified.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="fg-job-accept-btn"
            style={{ marginTop: "1rem" }}
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fg-job-page-wrapper">
      <div className="fg-job-top-nav">
        <h1 className="fg-job-nav-title">Available Jobs</h1>
        <div className="fg-job-notif-box">
          <div className="fg-job-notif-dot"></div>
          <FiBell size={24} />
        </div>
      </div>

      <div className="fg-job-back-row">
        <button onClick={() => navigate(-1)} className="fg-job-back-btn">
          <FiArrowLeft />
          <span>Back to Jobs</span>
        </button>
      </div>

      <div className="fg-job-main-header">
        <div className="fg-job-title-container">
          <div className="fg-job-heading-group">
            <h2 className="fg-job-main-heading">{job?.productType}</h2>
            <span className="fg-job-escrow-badge">
              <FiShield className="fg-job-badge-icon" />
              Escrow Secured
            </span>
          </div>
          <p className="fg-job-sub-meta">
            {job?.quantity} {job?.weight} • {job?.trackingId}
          </p>
        </div>

        <div className="fg-job-payout-box">
          <span className="fg-job-payout-label">Estimated Payout</span>
          <span className="fg-job-payout-amount">{job?.estimatedPayout}</span>
        </div>
      </div>

      <div className="fg-job-content-layout">
        {/* ── Left Column ── */}
        <div className="fg-job-left-column">
          <div className="fg-job-section-card">
            <h3 className="fg-job-card-title">Route Information</h3>

            <div className="fg-job-route-timeline">
              <div className="fg-job-timeline-item">
                <div className="fg-job-icon-pin pickup-bg">
                  <FiMapPin />
                </div>
                <div className="fg-job-timeline-details">
                  <span className="fg-job-timeline-label">Pickup Location</span>
                  <span className="fg-job-location-name">{job?.pickup?.landmark}</span>
                  <span className="fg-job-location-sub">{job?.pickup?.address}</span>
                </div>
              </div>

              <div className="fg-job-timeline-line"></div>

              <div className="fg-job-timeline-item">
                <div className="fg-job-icon-pin delivery-bg">
                  <FiMapPin />
                </div>
                <div className="fg-job-timeline-details">
                  <span className="fg-job-timeline-label">Delivery Location</span>
                  <span className="fg-job-location-name">{job?.destination}</span>
                </div>
              </div>
            </div>

            <div className="fg-job-route-meta-grid">
              <div className="fg-job-meta-item">
                <span className="fg-job-meta-label">Est. Duration</span>
                <span className="fg-job-meta-val">{job?.estimatedDuration}</span>
              </div>
              {job?.distance && (
                <div className="fg-job-meta-item">
                  <span className="fg-job-meta-label">Distance</span>
                  <span className="fg-job-meta-val">{job.distance}</span>
                </div>
              )}
            </div>
          </div>

          <div className="fg-job-escrow-banner-card">
            <div className="fg-job-banner-icon-box">
              <FiShield />
            </div>
            <div className="fg-job-banner-content">
              <h4>Payment Secured via Escrow</h4>
              <p>
                The farmer has deposited <strong>{job?.estimatedPayout}</strong> into
                escrow. Payment will be automatically released to your wallet upon
                successful delivery confirmation.
              </p>
              <div className="fg-job-banner-guarantee">
                <FiCheckCircle />
                <span>Your payment is 100% guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="fg-job-right-column">
          <div className="fg-job-section-card">
            <h3 className="fg-job-card-title">Farmer Information</h3>
            <div className="fg-job-farmer-profile">
              <div className="fg-job-farmer-avatar">{initials(job?.owner.name)}</div>
              <div className="fg-job-farmer-info">
                <span className="fg-job-farmer-name">{job?.owner.name}</span>
                <span className="fg-job-farmer-rating">
                  {job?.owner.rating ? `★ ${job.owner.rating}` : "★ Verified"}
                </span>
              </div>
            </div>

            <div className="fg-job-farmer-stats-list">
              {job?.farmer?.totalDeliveries !== undefined && (
                <div className="fg-job-farmer-stat-row">
                  <span className="fg-job-fstat-label">Total Deliveries</span>
                  <span className="fg-job-fstat-val">{job.farmer.totalDeliveries}</span>
                </div>
              )}
              {job?.farmer?.phone && (
                <div className="fg-job-farmer-stat-row">
                  <span className="fg-job-fstat-label">Phone</span>
                  <span className="fg-job-fstat-val">{job.farmer.phone}</span>
                </div>
              )}
              {job?.farmer?.memberSince && (
                <div className="fg-job-farmer-stat-row">
                  <span className="fg-job-fstat-label">Member Since</span>
                  <span className="fg-job-fstat-val">{job.farmer.memberSince}</span>
                </div>
              )}
            </div>

            <div className="fg-job-farmer-verified-badge">
              <FiCheckCircle />
              <span>Verified Farmer</span>
            </div>
          </div>

          <div className="fg-job-section-card">
            <h3 className="fg-job-card-title">Actions</h3>

            {acceptError && (
              <div className="fg-job-accept-error">
                <FiAlertCircle size={14} />
                <span>{acceptError}</span>
              </div>
            )}

            <div className="fg-job-actions-stack">
              <button
                className="fg-job-accept-btn"
                onClick={handleAccept}
                disabled={accepting}
              >
                {accepting ? "Accepting…" : "Accept Delivery"}
              </button>
              <button
                className="fg-job-decline-btn"
                onClick={() => navigate(-1)}
                disabled={accepting}
              >
                Decline Job
              </button>
            </div>
          </div>

          <div className="fg-job-section-card">
            <h3 className="fg-job-card-title">Quick Stats</h3>
            <div className="fg-job-quick-stats-list">
              <div className="fg-job-qstat-row">
                <FiClock />
                <span>Posted {timeAgo(job?.postedAt)}</span>
              </div>
              {job?.viewCount !== undefined && (
                <div className="fg-job-qstat-row">
                  <FiEye />
                  <span>{job.viewCount} drivers viewing</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverJobDetails;