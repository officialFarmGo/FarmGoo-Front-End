import React, { useState } from "react";
import DashboardHeader from "../../Components/DashboardHeader";
import WeatherAlert from "../../Components/WeatherAlert";
import ActiveDeliveries from "../../Components/ActiveDeliveries";
import MarketSectionHolder from "./MarketSectionHolder";
import RequestTransport from "../../Components/RequestTransport";
import TrackDeliveryTwo from "../TrackDeliveryTwo";

const DashboardPagesComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackingId, setTrackingId] = useState(null);

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

      {isModalOpen && (
        <RequestTransport onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default DashboardPagesComponent;