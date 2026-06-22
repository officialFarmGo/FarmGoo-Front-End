import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  HiOutlineArrowLeft, 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlineUserAdd 
} from "react-icons/hi";
import { BiLeaf } from "react-icons/bi";
import { FiTruck } from "react-icons/fi";
import "../CSS/AgentFarmersList.css";

const AgentFarmersList = ({ onBackClick, onAddFarmerClick,onCreateDeliveryClick }) => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const navigate = useNavigate();

  const [farmersData, setFarmersData] = useState([]);
  const [overviewStats, setOverviewStats] = useState({
    totalFarmers: 0,
    totalDeliveries: 0,
    totalAmountSpent: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmersHub = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BaseUrl}/agentDashboard/agentsFarmersOverview`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data?.data) {
          setFarmersData(response.data.data.farmers || []);
          setOverviewStats(response.data.data.stats || {
            totalFarmers: 0,
            totalDeliveries: 0,
            totalAmountSpent: 0
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setFarmersData([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchFarmersHub();
  }, [token, BaseUrl]);

  const formatSpent = (num) => {
    if (num >= 1000) {
      return `₦${(num / 1000).toFixed(0)}K`;
    }
    return `₦${num || 0}`;
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "F";
  };

  // Toggles back inline layout view if prop exists; else navigates via route
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate("/dashboard");
    }
  };

  // Toggles inline add farmer form if prop exists; else navigate via route
  const handleAddFarmer = () => {
    if (onAddFarmerClick) {
      onAddFarmerClick();
    } else {
      navigate("/dashboard/add-farmer");
    }
  };

  const handleCreateRequest = (farmer) => {
    navigate("/dashboard/create-request", { state: { farmer } });
  };

  if (loading) return <div className="fhub-loading">Loading farmer profiles...</div>;
  if (error) return <div className="fhub-error">Error loading records: {error}</div>;

  return (
    <div className="fhub-page-container">
      <button type="button" className="fhub-back-btn" onClick={handleBack}>
        <HiOutlineArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="fhub-header-row">
        <div>
          <h1 className="fhub-main-title">My Farmers</h1>
          <p className="fhub-subtitle">Manage your farmer network</p>
        </div>
        <button type="button" className="fhub-add-farmer-btn" onClick={handleAddFarmer}>
          <HiOutlineUserAdd size={18} />
          Add Farmer
        </button>
      </div>

      <div className="fhub-summary-grid">
        <div className="fhub-stat-card">
          <span className="fhub-stat-number">{overviewStats.totalFarmers}</span>
          <span className="fhub-stat-label">Total Farmers</span>
        </div>
        <div className="fhub-stat-card">
          <span className="fhub-stat-number">{overviewStats.totalDeliveries}</span>
          <span className="fhub-stat-label">Total Deliveries</span>
        </div>
        <div className="fhub-stat-card">
          <span className="fhub-stat-number">{formatSpent(overviewStats.totalAmountSpent)}</span>
          <span className="fhub-stat-label">Total amount spent</span>
        </div>
      </div>

      <div className="fhub-list-wrapper">
        {!Array.isArray(farmersData) || farmersData.length === 0 ? (
          <div className="fhub-empty-state">No farmers registered under this network profile yet.</div>
        ) : (
          farmersData.map((farmer) => (
            <div key={farmer._id || farmer.id} className="fhub-farmer-card">
              <div className="fhub-farmer-left">
                <div className="fhub-avatar-circle">
                  {getInitial(farmer.farmName || farmer.farmerFullName || farmer.firstName)}
                </div>
                
                <div className="fhub-details-grid">
                  <div className="fhub-info-block">
                    <h3 className="fhub-farm-name">
                      {farmer.farmName || farmer.farmerFullName || `${farmer.firstName || ''} ${farmer.lastName || ''}`.trim() || 'Unnamed Farm'}
                    </h3>
                    <p className="fhub-meta-line">
                      <HiOutlinePhone className="fhub-icon-dim" />
                      {farmer.phoneNumber || "+234 000 000 0000"}
                    </p>
                    <p className="fhub-meta-line">
                      <BiLeaf className="fhub-icon-dim" />
                      {Array.isArray(farmer.produceTypes) 
                        ? farmer.produceTypes.join(", ") 
                        : farmer.mainProduceType || farmer.produceTypes || "Crop Products"}
                    </p>
                    <span className="fhub-date-stamp">
                      Joined {farmer.joinedDate || new Date(farmer.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) || "Recent"}
                    </span>
                  </div>

                  <div className="fhub-info-block alignment-spacer">
                    <p className="fhub-meta-line text-darker">
                      <HiOutlineLocationMarker className="fhub-icon-dim" />
                      {farmer.farmLocation || farmer.location || `${farmer.townOrVillage || ''}, ${farmer.state || ''}`.replace(/^, |, $/g, '') || 'No location'}
                    </p>
                    <p className="fhub-meta-line text-darker">
                      <FiTruck className="fhub-icon-dim" />
                      {farmer.deliveriesCount || 0} deliveries
                    </p>
                  </div>
                </div>
              </div>

              <button 
                type="button" 
                className="fhub-action-btn"
                onClick={() =>onCreateDeliveryClick(farmer)}
              >
                Create Request
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentFarmersList;