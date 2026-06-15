import React, { useEffect } from "react";
import { Flex, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import successCheckIcon from "../../assets/Container (1).png";
import "../../CSS/SuccessFullVerification.css";

const { Title, Text } = Typography;

const SuccessFullVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const finalRole = location.state?.role;
  console.log(finalRole);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (finalRole === "farmer") {
        navigate("/farmer/dashboard");
      }
      if (finalRole === "driver") {
        navigate("/drivers/dashboard");
      } else if (finalRole === "agent") {
        navigate("/agent/dashboard");
      } else {
        navigate("/");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, finalRole]);

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
