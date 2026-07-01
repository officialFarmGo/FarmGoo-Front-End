import React, { useState, useEffect } from 'react';
import { FiTruck, FiCheckCircle, FiClock, FiSearch, FiSliders, FiMapPin, FiArrowRight, FiShield, FiBell, FiAlertCircle } from 'react-icons/fi';
import '../CSS/DriverActiveDeliveries.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BaseUrl;

const statusClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'in transit': return 'transit';
    case 'accepted': return 'accepted';
    case 'completed': return 'completed';
    default: return 'accepted';
  }
};

const progressPercent = (status) => {
  switch (status?.toLowerCase()) {
    case 'accepted': return 10;
    case 'in transit': return 65;
    case 'completed': return 100;
    default: return 0;
  }
};

const timeAgo = (iso) => {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 36e5);
  if (h < 1) return 'Just now';
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const DriverActiveDeliveries = () => {
  const nav = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [active, setActive] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [stats, setStats] = useState({ active: 0, completed: 0, avgETA: 'N/A' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await fetch(`${BASE_URL}/driverDash/driverDeliveries`, {
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`Failed to fetch deliveries (${res.status})`);
        const data = await res.json();
        setActive(data.data.activeDeliveries ?? []);
        setCompleted(data.data.completedDeliveries ?? []);
        setStats(data.data.stats ?? { active: 0, completed: 0, avgETA: 'N/A' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, [token]);

  const displayed = (activeTab === 'active' ? active : completed).filter((d) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      d.trackingId?.toLowerCase().includes(q) ||
      d.productType?.toLowerCase().includes(q) ||
      d.AddressOrpickUpLocation?.toLowerCase().includes(q) ||
      d.Destination?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fg-deliv-page-wrapper">
      <div className="fg-deliv-header-row">
        <h1 className="fg-deliv-main-title">Active Deliveries</h1>
        <div className="fg-deliv-notif-box" onClick={() => nav("notification")} style={{ cursor: "pointer" }}>
          <div className="fg-deliv-notif-dot"></div>
          <FiBell size={24} />
        </div>
      </div>

      <div className="fg-deliv-welcome-block">
        <h2>My Deliveries</h2>
        <p>Track and manage all your active and completed deliveries</p>
      </div>

      <div className="fg-deliv-stats-grid">
        <div className="fg-deliv-stat-card">
          <div className="fg-deliv-icon-wrapper blue-bg">
            <FiTruck />
          </div>
          <div className="fg-deliv-stat-info">
            <span className="fg-deliv-stat-num">{loading ? '—' : stats.active}</span>
            <span className="fg-deliv-stat-label">Active</span>
          </div>
        </div>

        <div className="fg-deliv-stat-card">
          <div className="fg-deliv-icon-wrapper green-bg">
            <FiCheckCircle />
          </div>
          <div className="fg-deliv-stat-info">
            <span className="fg-deliv-stat-num">{loading ? '—' : stats.completed}</span>
            <span className="fg-deliv-stat-label">Completed</span>
          </div>
        </div>

      </div>

      <div className="fg-deliv-filter-bar">
        <div className="fg-deliv-search-wrapper">
          <FiSearch className="fg-deliv-search-icon" />
          <input
            type="text"
            placeholder="Search by delivery ID, produce, or location..."
            className="fg-deliv-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="fg-deliv-filter-btn">
          <FiSliders />
          <span>Filters</span>
        </button>
      </div>

      <div className="fg-deliv-tabs-row">
        <button
          className={`fg-deliv-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Deliveries ({stats.active})
        </button>
        <button
          className={`fg-deliv-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({stats.completed})
        </button>
      </div>

      {loading && (
        <div className="fg-deliv-state-box">
          <div className="tj-spinner" />
          <p>Loading deliveries...</p>
        </div>
      )}

      {error && (
        <div className="fg-deliv-state-box fg-deliv-error">
          <FiAlertCircle size={28} />
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try again</button>
        </div>
      )}

      {!loading && !error && displayed.length === 0 && (
        <div className="fg-deliv-state-box">
          <p>No {activeTab} deliveries found.</p>
        </div>
      )}

      {!loading && !error && displayed.length > 0 && (
        <div className="fg-deliv-cards-stack">
          {displayed.map((d) => (
            <div key={d._id} className="fg-deliv-order-card">
              <div className="fg-deliv-card-main">
                <div className="fg-deliv-item-header">
                  <div className="fg-deliv-title-badge-row">
                    <h3 className="fg-deliv-item-title">{d.productType}</h3>
                    <span className={`fg-deliv-status-tag ${statusClass(d.status)}`}>
                      {d.status}
                    </span>
                  </div>
                  <p className="fg-deliv-meta-text">
                    {d.quantity} {d.weight} • ID: {d.trackingId}
                  </p>
                </div>

                <div className="fg-deliv-route-row">
                  <div className="fg-deliv-route-point">
                    <FiMapPin className="fg-deliv-pin-origin" />
                    <span>{d.AddressOrpickUpLocation}</span>
                  </div>
                  <FiArrowRight className="fg-deliv-route-arrow" />
                  <div className="fg-deliv-route-point">
                    <FiMapPin className="fg-deliv-pin-dest" />
                    <span>{d.Destination}</span>
                  </div>
                </div>

                <div className="fg-deliv-details-grid">
                  <div>
                    <span className="fg-deliv-detail-label">Customer</span>
                    <span className="fg-deliv-detail-value">{d.ownerName ?? '—'}</span>
                  </div>
                  <div>
                    <span className="fg-deliv-detail-label">Landmark</span>
                    <span className="fg-deliv-detail-value">{d.Destination ?? '—'}</span>
                  </div>
                  <div>
                    <span className="fg-deliv-detail-label">Est. Duration</span>
                    <span className="fg-deliv-detail-value">{d.estimatedDuration ?? '—'}</span>
                  </div>
                  {/*  */}
                </div>


                


                <div className="fg-deliv-escrow-row">
                  <FiShield />
                  <span>Escrow Secured</span>
                </div>
              </div>

              <div className="fg-deliv-card-sidebar">
                <div className="fg-deliv-payment-box">
                  <span className="fg-deliv-pay-label">Payment</span>
                  <span className="fg-deliv-pay-amount">
                    ₦{(d.earnedRaw ?? d.totalFare ?? 0).toLocaleString()}
                  </span>
                </div>
                <button className="fg-deliv-track-btn">
                  <FiMapPin />
                  <span onClick={()=>nav(`/trackdelivery/${d._id}`, { state: { delivery: d } })}>Check Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverActiveDeliveries;