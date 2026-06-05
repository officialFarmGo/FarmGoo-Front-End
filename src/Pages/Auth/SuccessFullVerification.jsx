import React, { useEffect } from "react";
import { Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import successCheckIcon from "../../assets/Container (1).png";
import "../../CSS/SuccessFullVerification.css";

const { Title, Text } = Typography;

const SuccessFullVerification = () => {
  const navigate = useNavigate();
  const { userRole, loginUser } = useAuth();

  useEffect(() => {
    loginUser(userRole);

    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, userRole, loginUser]);

  return (
    <div className="fg-success-container">
      <Flex vertical align="center" justify="center" className="fg-success-wrapper">
        
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
          Redirecting you to complete your profile...
        </Text>

      </Flex>
    </div>
  );
};

export default SuccessFullVerification;