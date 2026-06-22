import React, { useEffect } from "react";
import { desktopMenuItems, mobileMenuItems } from "../../Data/Data";
import DashboardLayout from "../../Components/DashboardLayout";
import axios from "axios";
import { useSelector } from "react-redux";
import { authUser } from "../../LIB/AuthenticationSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [data, setData] = React.useState(null);
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/agentDashboard/getOneAgent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(authUser(response.data.data));
      setData(response.data.data);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  if (token) {
    fetchData();
  }
}, [token, BaseUrl, dispatch]);
  return (
    <>
      <DashboardLayout
        desktopMenuItems={desktopMenuItems}
        mobileMenuItems={mobileMenuItems}
        profile={
          data?.firstName.charAt(0).toUpperCase() +
          data?.lastName.charAt(0).toUpperCase() || "NA"
        }
        profileName={data?.firstName + " " + data?.lastName || "NA"} 
        rows={data?.role || "NA"} 
      />
    </>
  );
};

export default Dashboard;
