import React from "react";
import "../CSS/Transport.css";
import TransportJob from "../Components/TransportJob";
import TotalJobs from "../Components/Totaljobs";

const Transport = () => {
  return (
    <div className="transport-container">
      <TransportJob />
      <TotalJobs />
    </div>
  );
};

export default Transport;