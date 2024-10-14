import { useNavigate, useLocation } from "react-router-dom";
import SideMenuItem from "./SideMenuItem";
import {
  ChartPie,
  ChartNoAxesColumnIncreasing,
  ShoppingCart,
  ShoppingBag,
  ChartLine,
  MessageCircleMore,
  Settings,
  LogOut,
} from "lucide-react";

const menuList = [
  { icon: <ChartPie width={32} height={32} />, label: "Dashboard", path: "/" },
  {
    icon: <ChartNoAxesColumnIncreasing width={32} height={32} />,
    label: "Leaderboard",
    path: "/leaderboard",
  },
  {
    icon: <ShoppingCart width={32} height={32} />,
    label: "Order",
    path: "/order",
  },
  {
    icon: <ShoppingBag width={32} height={32} />,
    label: "Products",
    path: "/products",
  },
  {
    icon: <ChartLine width={32} height={32} />,
    label: "Sales Report",
    path: "/sales",
  },
  {
    icon: <MessageCircleMore width={32} height={32} />,
    label: "Messages",
    path: "/messages",
  },
  {
    icon: <Settings width={32} height={32} />,
    label: "Settings",
    path: "/settings",
  },
  {
    icon: <LogOut width={32} height={32} />,
    label: "Sign Out",
    path: "/sign-out",
  },
];

export default function SideMenuList() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="flex flex-col gap-2">
      {menuList.map((menu, index) => (
        <SideMenuItem
          key={index}
          id={index}
          icon={menu.icon}
          onClick={() => navigate(menu.path)}
          isFocused={pathName === menu.path}
          label={menu.label}
        />
      ))}
    </div>
  );
}
