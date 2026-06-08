import React from "react";
import "../../CSS/Profile.css";
import DriversProfile from "../Profile/DriversProfile";
import PersonlaProfile from "../Profile/PersonlaProfile";

const Profile = () => {
  return (
    <div className="profile-container">
      <DriversProfile />
      <PersonlaProfile />
    </div>
  );
};

export default Profile;