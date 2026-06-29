import React from "react";
import {
  AppstoreOutlined,
  CarryOutOutlined,
  EnvironmentOutlined,
  WalletOutlined,
  DollarOutlined,
  UserOutlined,
  HomeOutlined,
  BellOutlined,
} from "@ant-design/icons";
import DashboardLayout from "../Components/DashboardLayout";

export const driverDesktopMenuItems = [
  {
    path: "",
    label: "Dashboard",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
  },
  {
    path: "jobss",
    label: "Available Jobs",
    icon: <CarryOutOutlined style={{ fontSize: "20px" }} />,
  },
  {
    path: "activedelivery",
    label: "Active Deliveries",
    icon: <EnvironmentOutlined style={{ fontSize: "20px" }} />,
  },
  {
    path: "wallet",
    label: "Wallet",
    icon: <WalletOutlined style={{ fontSize: "20px" }} />,
  },
  {
    path: "earnings",
    label: "Earnings",
    icon: <DollarOutlined style={{ fontSize: "20px" }} />,
  },
  // {
  //   path: "notification",
  //   label: "Notification",
  //   icon: <BellOutlined style={{ fontSize: "20px" }} />,
  // },
  {
    path: "profile",
    label: "Profile",
    icon: <UserOutlined style={{ fontSize: "20px" }} />,
  },
];

export const driverMobileMenuItems = [
  {
    path: "",
    label: "Home",
    icon: <HomeOutlined style={{ fontSize: "22px" }} />,
  },
  {
    path: "jobss",
    label: "Jobs",
    icon: <CarryOutOutlined style={{ fontSize: "22px" }} />,
  },
  {
    path: "activedelivery",
    label: "Deliveries",
    icon: <EnvironmentOutlined style={{ fontSize: "22px" }} />,
  },
  {
    path: "wallet",
    label: "Wallet",
    icon: <WalletOutlined style={{ fontSize: "22px" }} />,
  },
  {
    path: "profile",
    label: "Profile",
    icon: <UserOutlined style={{ fontSize: "22px" }} />,
  },
];
