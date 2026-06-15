import React from "react";
import "../../CSS/market-tips-section.css";
import MarketTips from "../MarketTips";

const MarketSectionHolder = ({ marketTips, recentDeliveries }) => {
  return (
    <div className="fg-market-tips-section-container">
      <MarketTips tips={marketTips} recentDeliveries={recentDeliveries} />
    </div>
  );
};

export default MarketSectionHolder;
