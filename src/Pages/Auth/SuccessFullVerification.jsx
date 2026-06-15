import React, { useEffect } from "react";
import { Flex, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import successCheckIcon from "../../assets/Container (1).png";
import "../../CSS/SuccessFullVerification.css";

const { Title, Text } = Typography;

const SuccessFullVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const reduxDriverId = useSelector((state) => state.auth?.user?._id);
  console.log("reduxDriverId", reduxDriverId);

  const finalRole = location.state?.role || "farmer";
  const dynamicDriverId =
    reduxDriverId || location.state?.userId || location.state?.driverId;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (finalRole === "farmer") {
        navigate(`/farmer_kyc/${dynamicDriverId}`,{ state: {
          ...location.state,
        },
      });
      } else if (finalRole === "driver") {
        if (dynamicDriverId) {
          navigate(`/driver_kyc/${dynamicDriverId}`);
        } else {
          alert("Session expired. Please log in again.");
          navigate("/login");
        }
      } else if (finalRole === "agent") {
        navigate("/agent/dashboard");
      } else {
        navigate("/");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, finalRole, dynamicDriverId]);

  return (
    <div className="fg-success-container">
      <Flex
        vertical
        align="center"
        justify="center"
        className="fg-success-wrapper"
      >
        <div className="fg-success-icon-box">
          <img
            src={successCheckIcon}
            alt="Verification Successful"
            className="fg-success-img"
          />
        </div>
        <Title level={2} className="fg-success-title">
          Verification Successful!
        </Title>
        <Text className="fg-success-subtitle">
          Redirecting you to your dashboard...
        </Text>
      </Flex>
    </div>
  );
};

export default SuccessFullVerification;
