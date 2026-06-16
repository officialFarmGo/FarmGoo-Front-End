import React, { useEffect, useState } from "react";
import { Search, ChevronDown, MapPin, ArrowRight, Truck, Star, SlidersHorizontal } from "lucide-react";
import "../CSS/TransportJob.css";
import { useSelector } from "react-redux";
const TransportJob = () => {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("nearest");
  const [statusFilter, setStatusFilter] = useState("all");
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        
        const res = await fetch(
          "https://farmgoo-backend-1.onrender.com/api/v1/driverDash/getAvailableJobs",
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data.data.jobs);
        setFiltered(data.data.jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let result = [...jobs];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (j) =>
          j.productType.toLowerCase().includes(q) ||
          j.pickup.address.toLowerCase().includes(q) ||
          j.destination.toLowerCase().includes(q)
      );
    }

    if (sortOrder === "nearest") {
      result = result.sort(
        (a, b) => parseFloat(a.estimatedDuration) - parseFloat(b.estimatedDuration)
      );
    } else {
      result = result.sort(
        (a, b) => parseFloat(b.estimatedDuration) - parseFloat(a.estimatedDuration)
      );
    }

    setFiltered(result);
  }, [search, sortOrder, statusFilter, jobs]);

  const initials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const timeAgo = (iso) => {
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / 36e5);
    if (h < 1) return "Just now";
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <div className="transport-job-container">
      {/* Header */}
      <div className="tj-header-group">
        <h1 className="tj-main-title">Available Transport Jobs</h1>
        <p className="tj-sub-text">
          Browse and accept transport requests from verified farmers
        </p>
      </div>

      {/* Filter Bar */}
      <div className="tj-filter-card">
        <div className="tj-search-wrapper">
          <Search className="tj-search-icon" size={18} />
          <input
            type="text"
            placeholder="Search by produce, location..."
            className="tj-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="tj-dropdown-group">
          <div className="tj-select-wrapper">
            <select
              className="tj-filter-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="nearest">Nearest First</option>
              <option value="farthest">Farthest First</option>
            </select>
            <ChevronDown className="tj-select-arrow" size={16} />
          </div>
          <div className="tj-select-wrapper">
            <select
              className="tj-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Jobs</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown className="tj-select-arrow" size={16} />
          </div>
        </div>
      </div>

      {/* Meta Bar */}
      {!loading && !error && (
        <div className="tj-meta-bar">
          <span className="tj-count-text">
            <strong className="tj-count-number">{filtered.length}</strong> jobs available
          </span>
          <button className="tj-filter-btn">
            <SlidersHorizontal size={16} />
            <span>More Filters</span>
          </button>
        </div>
      )}

      {/* States */}
      {loading && (
        <div className="tj-state-box">
          <div className="tj-spinner" />
          <p>Loading available jobs...</p>
        </div>
      )}

      {error && (
        <div className="tj-state-box tj-error">
          <p>Could not load jobs. {error}</p>
          <button onClick={() => window.location.reload()}>Try again</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="tj-state-box">
          <p>No jobs match your search.</p>
        </div>
      )}

      {/* Cards */}
      {!loading && !error && (
        <div className="tj-cards-list">
          {filtered.map((job) => (
            <div key={job.deliveryId} className="tj-job-card">
              {/* Left Block */}
              <div className="tj-card-left">
                <div className="tj-card-header">
                  <div className="tj-title-row">
                    <h3 className="tj-job-title">{job.productType}</h3>
                    <div className="tj-badge-group">
                      <span className="tj-badge escrow">
                        <span className="tj-checkmark">✓</span> Escrow Secured
                      </span>
                    </div>
                  </div>
                  <p className="tj-meta-specs">
                    {job.quantity} {job.weight} • {job.trackingId}
                  </p>
                </div>

                {/* Route */}
                <div className="tj-route-display">
                  <div className="tj-route-point">
                    <MapPin className="tj-pin-icon src" size={16} />
                    <span>{job.pickup.address}</span>
                  </div>
                  <ArrowRight className="tj-route-arrow" size={16} />
                  <div className="tj-route-point">
                    <MapPin className="tj-pin-icon dest" size={16} />
                    <span>{job.destination}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="tj-metrics-grid">
                  <div className="tj-metric-item">
                    <span className="tj-metric-label">Landmark</span>
                    <span className="tj-metric-value font-dark">
                      {job.pickup.landmark}
                    </span>
                  </div>
                  <div className="tj-metric-item">
                    <span className="tj-metric-label">Vehicle Type</span>
                    <span className="tj-metric-value">
                      <Truck size={14} className="tj-inline-icon" />{" "}
                      {job.vehicleRequired !== "N/A" ? job.vehicleRequired : "Any"}
                    </span>
                  </div>
                  <div className="tj-metric-item">
                    <span className="tj-metric-label">Est. Duration</span>
                    <span className="tj-metric-value font-dark">
                      {job.estimatedDuration}
                    </span>
                  </div>
                  <div className="tj-metric-item">
                    <span className="tj-metric-label">Posted</span>
                    <span className="tj-metric-value">{timeAgo(job.postedAt)}</span>
                  </div>
                </div>

                <hr className="tj-card-divider" />

                {/* Footer */}
                <div className="tj-card-footer">
                  <div className="tj-avatar-circle">{initials(job.farmer.name)}</div>
                  <div className="tj-author-info">
                    <span className="tj-farm-name">{job.farmer.name}</span>
                    <span className="tj-rating-tag">
                      <Star size={12} fill="#EAB308" stroke="#EAB308" />
                      <strong>Verified Farmer</strong> • {job.farmer.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Block */}
              <div className="tj-card-right">
                <div className="tj-payout-box">
                  <span className="tj-payout-label">Estimated Payout</span>
                  <span className="tj-payout-amount">{job.estimatedPayout}</span>
                </div>
                <div className="tj-action-buttons">
                  <button className="tj-btn-primary">Accept Job</button>
                  <button className="tj-btn-secondary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransportJob;
