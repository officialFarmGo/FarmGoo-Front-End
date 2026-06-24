import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeMenuItem } from "../../LIB/AuthenticationSlice";
import DashboardHeader from "../../Components/DashboardHeader";
import WeatherAlert from "../../Components/WeatherAlert";
import ActiveDeliveries from "../../Components/ActiveDeliveries";
import MarketSectionHolder from "./MarketSectionHolder";
import RequestTransport from "../../Components/RequestTransport";
import TrackDeliveryTwo from "../TrackDeliveryTwo";
import ShowFundWalletModal from "../ShowFundWalletModal";

const DashboardPagesComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackingId, setTrackingId] = useState(null);

  // State handling for the one-time welcome fund wallet modal
  const [showFundWallet, setShowFundWallet] = useState(false);

  // State for insufficient balance warning modal
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);

  // State for wallet data
  const [walletData, setWalletData] = useState(null);

  // Get token from Redux
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  // Fetch wallet data to check available balance
  useEffect(() => {
    if (!token) return;

    const fetchWallet = async () => {
      try {
        const res = await fetch(`${BaseUrl}/farmerDash/farmerWallet`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setWalletData(data.data);
        } else {
          console.error("Failed to fetch wallet:", data.message);
        }
      } catch (err) {
        console.error("Error fetching wallet:", err);
      }
    };

    fetchWallet();
  }, [token, BaseUrl]);

  useEffect(() => {
    // Check if user is a first-time signup via localStorage flag
    const shouldPrompt = localStorage.getItem("showFundWalletModal");

    if (shouldPrompt === "true") {
      setShowFundWallet(true);
    }
  }, []);

  const handleCloseFundWalletModal = () => {
    setShowFundWallet(false);
    // Setting it to false (or completely removing it) ensures it never renders again
    localStorage.removeItem("showFundWalletModal");
  };

  // Handler to check balance before opening request transport modal
  const handleOpenRequestTransport = () => {
    const availableBalance = walletData?.availableBalance ?? 0;

    if (availableBalance === 0) {
      setShowInsufficientBalance(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseInsufficientBalance = () => {
    setShowInsufficientBalance(false);
  };

  const handleCloseRequestTransport = () => {
    setIsModalOpen(false);
    dispatch(activeMenuItem(0));
  };

  if (trackingId) {
    return (
      <TrackDeliveryTwo
        deliveryId={trackingId}
        onBack={() => setTrackingId(null)}
      />
    );
  }

  return (
    <div>
      <DashboardHeader onOpenRequestTransport={handleOpenRequestTransport} />
      <WeatherAlert />
      <ActiveDeliveries onTrack={(id) => setTrackingId(id)} />
      <MarketSectionHolder />

      {/* Request Transport Modal */}
      {isModalOpen && (
        <RequestTransport onClose={handleCloseRequestTransport} />
      )}

      {/* Insufficient Balance Warning Modal */}
      {showInsufficientBalance && (
        <div className="fg-modal-overlay">
          <div className="fg-modal-card animate-popup">
            <div className="fg-modal-icon-box">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 className="fg-modal-title">Insufficient Balance</h2>
            <p className="fg-modal-message">
              Your wallet balance is currently zero. Please fund your account to
              request transport services.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                type="button"
                className="fg-modal-btn"
                onClick={() => {
                  handleCloseInsufficientBalance();
                  dispatch(activeMenuItem(2)); // Set active menu to Wallet (index 2)
                  window.location.href = "/farmer/dashboard/wallet";
                }}
              >
                Fund Wallet
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  flex: 1,
                }}
                onClick={handleCloseInsufficientBalance}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* One-Time Signup Fund Wallet Prompt */}
      <ShowFundWalletModal
        isOpen={showFundWallet}
        onClose={handleCloseFundWalletModal}
      />
    </div>
  );
};

export default DashboardPagesComponent;
