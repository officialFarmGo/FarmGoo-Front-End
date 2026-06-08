import {
  AppstoreOutlined,
  EnvironmentOutlined,
  WalletOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
  CarOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";


// Desktop sidebar navigation items
export const desktopMenuItems = [
  {
    path: "",
    label: "Dashboard",
    icon: <AppstoreOutlined style={{ fontSize: "20px" }} />,
  },
  {
    path: "activedelivery",
    label: "Active Deliveries",
    icon: <EnvironmentOutlined style={{ fontSize: "20px" }} />,
  },
  {
    path: "wallet ",
    label: "Wallet",
    icon: <WalletOutlined style={{ fontSize: "20px" }} />,
  },
  {
    path: "notification ",
    label: "Notification",
    icon: <BellOutlined style={{ fontSize: "20px" }} />,
  },
  {
    path: "help&support", 
    label: "Help & Support",
    icon: <QuestionCircleOutlined style={{ fontSize: "20px" }} />,
  },
  {
    path: "settings",
    label: "Settings",
    icon: <SettingOutlined style={{ fontSize: "20px" }} />,
  },
];

// Mobile bottom tab navigation items
export const mobileMenuItems = [
  {
    path: " ",
    label: "Home",
    icon: <HomeOutlined style={{ fontSize: "22px" }} />,
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
    path: "",
    label: "Transport",
    icon: <CarOutlined style={{ fontSize: "22px" }} />,
  },
  {
    path: "settings",
    label: "Profile",
    icon: <UserOutlined style={{ fontSize: "22px" }} />,
  },
];
