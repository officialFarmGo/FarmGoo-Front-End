import React, { useState, useEffect } from "react";
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
      <DashboardHeader onOpenRequestTransport={() => setIsModalOpen(true)} />
      <WeatherAlert />
      <ActiveDeliveries onTrack={(id) => setTrackingId(id)} />
      <MarketSectionHolder />

      {/* Request Transport Modal */}
      {isModalOpen && (
        <RequestTransport onClose={() => setIsModalOpen(false)} />
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
