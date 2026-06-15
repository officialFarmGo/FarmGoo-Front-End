import React,{useEffect} from 'react';
import { desktopMenuItems, mobileMenuItems } from "../../Data/Data";
import DashboardLayout from '../../Components/DashboardLayout';
import axios from 'axios';
import { useSelector } from "react-redux";


const Dashboard = () => {
const [data, setData] = React.useState(null);
  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const token = useSelector((state) => state.auth.token);
  console.log("token", token);

useEffect(() => {
  try{
    const fetchData = async () => {
      const response = await axios.get(`${BaseUrl}/farmerDash/farmDash`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("response", response.data);
      // setData(response.data);
    };
    fetchData();
  }catch(error){
    console.error("Error fetching data:", error);
  }
}, []);

  return (
    <>
    <DashboardLayout 
      desktopMenuItems={desktopMenuItems} 
      mobileMenuItems={mobileMenuItems} 
      profile="J"
      profileName=" Jola Ogeremu"
      rows="Farmer"
    />
   
    </>
  );
}

export default Dashboard;
