import React from "react";
import "../../CSS/info.css";
import { FaSeedling, FaTruck, FaUserFriends } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../Context/AuthContext";
const Info = () => {
  const { selectRole } = useAuth();
  const navigate = useNavigate();

     const handleRoleSelection = (role) => {
      selectRole(role);
      navigate("/signup");
    };
  return (
    <div className="info-container">
      <div className="info-content">
        <h1>Create your account</h1>
        <p>Free to join. Choose what describes you best.</p>

        <div className="role-container">
          <div className="role-card"
          onClick={() => handleRoleSelection("farmer")}
          >
            <div className="role-icon">
              <FaSeedling />
            </div>
            <h3>I'm a Farmer</h3>
            <span>Send my produce to market</span>
          </div>

          <div className="role-card"
          onClick={() => handleRoleSelection("driver")}
          >
            <div className="role-icon">
              <FaTruck />
            </div>
            <h3>I'm a Driver</h3>
            <span>Find loads to haul</span>
          </div>

          <div className="role-card"
          onClick={() => handleRoleSelection("agent")}
          >
            <div className="role-icon">
              <FaUserFriends />
            </div>
            <h3>I'm an Agent</h3>
            <span>Help farmers in my community</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
