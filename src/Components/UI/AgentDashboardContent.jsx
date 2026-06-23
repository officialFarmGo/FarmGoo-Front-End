import React, { useState } from "react";
import AgentDeliveries from "../AgentDeliveries";
// Changed the import name here to match what you are rendering below
import AgentTrackDelivery from "../TrackDelivery";

const AgentDashboardContent = () => {
  // States handling the layout switching and capturing the delivery ID
  const [currentView, setCurrentView] = useState("deliveries");
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);

  return (
    <div className="your-existing-dashboard-layout-wrapper">
      <div className="your-main-content-area">
        {currentView === "deliveries" && (
          <AgentDeliveries
            onBackClick={() => setCurrentView("dashboard-home")}
            onTrackClick={(id) => {
              setSelectedDeliveryId(id); // Dynamically captures delivery._id from the list item
              setCurrentView("track-delivery"); // Switches layout cleanly
            }}
          />
        )}

        {currentView === "track-delivery" && (
          <AgentTrackDelivery
            deliveryId={selectedDeliveryId}
            onBackClick={() => setCurrentView("deliveries")}
          />
        )}
      </div>
    </div>
  );
};

export default AgentDashboardContent;
