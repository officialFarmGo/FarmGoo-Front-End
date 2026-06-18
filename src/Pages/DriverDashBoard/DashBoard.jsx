import React, { useEffect } from "react";
import DashboardLayout from "../../Components/DashboardLayout";
import {
  driverDesktopMenuItems,
  driverMobileMenuItems,
} from "../../Data/DriverDashboard";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authUser } from "../../LIB/AuthenticationSlice";

const DashBoard = () => {
  const [data, setData] = React.useState(null);
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();


  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${BaseUrl}/driverDash/getOneDriver`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(authUser(response.data.data));
        // console.log("response", response);
        setData(response.data.data);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <div>
      <DashboardLayout
        desktopMenuItems={driverDesktopMenuItems}
        mobileMenuItems={driverMobileMenuItems}
        profile={
          data?.firstName.charAt(0).toUpperCase() +
            data?.lastName.charAt(0).toUpperCase() || "NA"
        }
        profileName={data?.firstName + " " + data?.lastName || "NA"}
        rows={data?.role || "NA"}
      />
    </div>
  );
};

export default DashBoard;
