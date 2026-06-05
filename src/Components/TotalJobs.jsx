import React from "react";
import {
  SlidersHorizontal,
  MapPin,
  ArrowRight,
  Truck,
  Sun,
  Cloud,
  CloudSun,
  Star,
} from "lucide-react";
import "../CSS/TotalJobs.css";

const Totaljobs = () => {
  const jobsData = [
    {
      id: "JOB001",
      title: "Yam Tubers",
      weight: "1,200kg",
      isEscrowSecured: true,
      isUrgent: false,
      pickup: "Badgry",
      dropoff: "Oshodi Market, Lagos",
      distance: "12km from you",
      vehicleType: "Pickup Truck",
      pickupTime: "Today, 2:00 PM",
      weather: "Sunny",
      weatherIcon: <Sun size={16} />,
      farmName: "Chukwu Farms",
      rating: "4.8",
      avatarInit: "C",
      payout: "₦42,000",
    },
    {
      id: "JOB002",
      title: "Palm Oil",
      weight: "200L",
      isEscrowSecured: true,
      isUrgent: true,
      pickup: "Ogun State",
      dropoff: "Trade Fair, Lagos",
      distance: "8km from you",
      vehicleType: "Van",
      pickupTime: "Today, 4:00 PM",
      weather: "Cloudy",
      weatherIcon: <Cloud size={16} />,
      farmName: "Eze Oil Ltd",
      rating: "4.9",
      avatarInit: "E",
      payout: "₦65,000",
    },
    {
      id: "JOB003",
      title: "Fresh Tomatoes",
      weight: "600kg",
      isEscrowSecured: true,
      isUrgent: false,
      pickup: "Ketu, Market",
      dropoff: "Ikeja Market, Lagos",
      distance: "15km from you",
      vehicleType: "Pickup Truck",
      pickupTime: "Tomorrow, 6:00 AM",
      weather: "Partly Cloudy",
      weatherIcon: <CloudSun size={16} />,
      farmName: "Ketu Harvest",
      rating: "4.6",
      avatarInit: "P",
      payout: "₦20,000",
    },
    {
      id: "JOB004",
      title: "Cassava Flour",
      weight: "500kg",
      isEscrowSecured: true,
      isUrgent: false,
      pickup: "Abeokuta, Ogun",
      dropoff: "Surulere, Lagos",
      distance: "5km from you",
      vehicleType: "Pickup Truck",
      pickupTime: "Tomorrow, 10:00 AM",
      weather: "Sunny",
      weatherIcon: <Sun size={16} />,
      farmName: "Ogun Agro",
      rating: "4.7",
      avatarInit: "O",
      payout: "₦45,000",
    },
  ];

  return (
    <div className="total-jobs-container">
      {/* Top Meta Bar */}
      <div className="tj-meta-bar">
        <span className="tj-count-text">
          <strong className="tj-count-number">{jobsData.length}</strong> jobs
          available
        </span>
        <button className="tj-filter-btn">
          <SlidersHorizontal size={16} />
          <span>More Filters</span>
        </button>
      </div>

      {/* Jobs List Grid */}
      <div className="tj-cards-list">
        {jobsData.map((job) => (
          <div key={job.id} className="tj-job-card">
            {/* Left Info Block */}
            <div className="tj-card-left">
              {/* Header Titles & Badges */}
              <div className="tj-card-header">
                <div className="tj-title-row">
                  <h3 className="tj-job-title">{job.title}</h3>
                  <div className="tj-badge-group">
                    {job.isUrgent && (
                      <span className="tj-badge urgent">Urgent</span>
                    )}
                    {job.isEscrowSecured && (
                      <span className="tj-badge escrow">
                        <span className="tj-checkmark">✓</span> Escrow Secured
                      </span>
                    )}
                  </div>
                </div>
                <p className="tj-meta-specs">
                  {job.weight} • Job ID: {job.id}
                </p>
              </div>

              {/* Route Display */}
              <div className="tj-route-display">
                <div className="tj-route-point">
                  <MapPin className="tj-pin-icon src" size={16} />
                  <span>{job.pickup}</span>
                </div>
                <ArrowRight className="tj-route-arrow" size={16} />
                <div className="tj-route-point">
                  <MapPin className="tj-pin-icon dest" size={16} />
                  <span>{job.dropoff}</span>
                </div>
              </div>

              {/* Metrics Metrics Grid */}
              <div className="tj-metrics-grid">
                <div className="tj-metric-item">
                  <span className="tj-metric-label">Distance</span>
                  <span className="tj-metric-value font-dark">
                    {job.distance}
                  </span>
                </div>
                <div className="tj-metric-item">
                  <span className="tj-metric-label">Vehicle Type</span>
                  <span className="tj-metric-value">
                    <Truck size={14} className="tj-inline-icon" />{" "}
                    {job.vehicleType}
                  </span>
                </div>
                <div className="tj-metric-item">
                  <span className="tj-metric-label">Pickup Time</span>
                  <span className="tj-metric-value font-dark">
                    {job.pickupTime}
                  </span>
                </div>
                <div className="tj-metric-item">
                  <span className="tj-metric-label">Weather</span>
                  <span className="tj-metric-value">
                    {job.weatherIcon} {job.weather}
                  </span>
                </div>
              </div>

              {/* Card Divider Line */}
              <hr className="tj-card-divider" />

              {/* Footer Author Block */}
              <div className="tj-card-footer">
                <div className="tj-avatar-circle">{job.avatarInit}</div>
                <div className="tj-author-info">
                  <span className="tj-farm-name">{job.farmName}</span>
                  <span className="tj-rating-tag">
                    <Star size={12} fill="#EAB308" stroke="#EAB308" />
                    <strong>{job.rating}</strong> Verified Farmer
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Block */}
            <div className="tj-card-right">
              <div className="tj-payout-box">
                <span className="tj-payout-label">Estimated Payout</span>
                <span className="tj-payout-amount">{job.payout}</span>
              </div>
              <div className="tj-action-buttons">
                <button className="tj-btn-primary">View Details</button>
                <button className="tj-btn-secondary">Save for Later</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Totaljobs;
