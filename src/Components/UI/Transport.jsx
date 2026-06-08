import React from "react";


import TransportJob from "../../Components/TransportJob";
import Totaljobs from "../../Components/TotalJobs";


const Transport = () => {
  return (
    <div className="transport-container">
      <TransportJob />
      <Totaljobs/>
    </div>
  );
};

export default Transport;