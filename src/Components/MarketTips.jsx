import React from "react";
import "../CSS/market-tips-section.css";

const MarketTips = ({ tips, recentDeliveries }) => {
  const colors = ["green-bg", "blue-bg"];

  return (
    <div className="market-tips-container">
      <div className="market-card">
        <h2 className="market-card-title">Market Tips</h2>

        {!tips || tips.length === 0 ? (
          <div className="empty-state-text">
            No market tips available right now.
          </div>
        ) : (
          tips.map((tip, index) => (
            <div
              className={`tip-card ${colors[index % colors.length]}`}
              key={tip.id || index}
            >
              <h4>{tip.title}</h4>
              <p>{tip.description}</p>
            </div>
          ))
        )}
      </div>

      <div className="market-card">
        <div className="delivery-header">
          <h2 className="market-card-title">Recent Deliveries</h2>
          <span className="view-all">View All</span>
        </div>

        {!recentDeliveries || recentDeliveries.length === 0 ? (
          <div className="empty-state-text">No recent deliveries found.</div>
        ) : (
          recentDeliveries.map((delivery, index) => (
            <div className="delivery-card" key={delivery.id || index}>
              <div>
                <h4>
                  {delivery.quantity} - {delivery.weight}
                </h4>
                <p>{delivery.date}</p>
              </div>

              <div className="delivery-info">
                <h4>₦{Number(delivery.amount).toLocaleString()}</h4>
                <span
                  className={`status-${delivery.status?.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  ✓ {delivery.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MarketTips;