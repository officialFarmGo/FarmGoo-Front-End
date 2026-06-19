import React, { useEffect, useState } from "react";
import ActiveDeliveryNotification from "../ActiveDeliveryNotification";
import ActiveDeliveryHeader from "../ActiveDeliveryHeader";
import ActiveDeliveries from "../ActiveDeliveries";
import { apiInstance } from "../../Api/Api";
import TrackDeliveryTwo from "../TrackDeliveryTwo";

const ActiveDeliveryPageComponets = () => {
  const [serverResponse, setServerResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const [trackingId, setTrackingId] = useState(null);

  if (trackingId) {
    return (
      <TrackDeliveryTwo
        deliveryId={trackingId}
        onBack={() => setTrackingId(null)}
      />
    );
  }

  console.log(serverResponse);
  const FetchActiveDeliveries = async () => {
    setLoading(true);
    try {
      const response = await apiInstance.get("/farmerDash/activeDeliveries");
      // console.log(response);
      setServerResponse(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchActiveDeliveries();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #006432",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {/* <ActiveDeliveries /> */}
      <ActiveDeliveryHeader data={serverResponse?.status} />
      <ActiveDeliveryNotification data={serverResponse?.activeDeliveries} onTrack={(id) => setTrackingId(id)}/>
     
    </div>
  );
};

export default ActiveDeliveryPageComponets;
