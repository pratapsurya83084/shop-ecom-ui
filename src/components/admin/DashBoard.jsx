import React, { useContext, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  ShoppingCart,
  
  Users,
  BarChart3,
  Boxes,
  BadgePercent,
  MessageSquareText,
} from "lucide-react";
import AdminSetting   from './AdminSetting';
import Products  from './Products';
import AddProduct from "./AddProduct";
import GetAllProducts from "./GetAllProducts.jsx";
import AllUsers from "./AllUsers.jsx";
import AllOrders from "./AllOrders.jsx";
import ContextProvider from "../context/ContextProvider.jsx";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
const {Users} = useContext(ContextProvider);
console.log(Users);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
       
        case "Addproducts":
          return <AddProduct/>;
          case "AllproductsList":
            return <GetAllProducts/>;
      case "Orders":
        return <AllOrders/>;
      case "Users":
        return <AllUsers/>
      case "Analytics":
        return <h2 className="text-2xl font-semibold">Analytics Page</h2>;
      case "Reviews":
        return <h2 className="text-2xl font-semibold">Reviews Page</h2>;
        case "settings":
            return <AdminSetting/>
      default:
        return <h2>Select a section</h2>;
    }
  };

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSelect = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // close on mobile after click
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col w-64 bg-white shadow-md p-5">
        <SidebarContent onSelect={handleSelect} activeSection={activeSection} />
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white shadow-md w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <X className="cursor-pointer" onClick={handleToggle} />
        </div>
        <SidebarContent onSelect={handleSelect} activeSection={activeSection} />
      </div>

      {/* Hamburger */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <Menu onClick={handleToggle} className="cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

const SidebarContent = ({ onSelect, activeSection }) => (
  <nav className="space-y-4 mt-6">
    <SidebarItem
      icon={<LayoutDashboard size={20} />}
      label="Dashboard"
      active={activeSection === "dashboard"}
      onClick={() => onSelect("dashboard")}
    />
    
    <SidebarItem
      icon={<ShoppingCart size={20} />}
      label="Orders"
      active={activeSection === "Orders"}
      onClick={() => onSelect("Orders")}
    />
     <SidebarItem
      icon={<Package size={20} />}
      label="Addproducts"
      active={activeSection === "Addproducts"}
      onClick={() => onSelect("Addproducts")}
    />
     <SidebarItem
      icon={<ShoppingCart size={20} />}
      label="AllproductsList"
      active={activeSection === "AllproductsList"}
      onClick={() => onSelect("AllproductsList")}
    />
    <SidebarItem
      icon={<Users size={20} />}
      label="Users"
      active={activeSection === "Users"}
      onClick={() => onSelect("Users")}
    />
    <SidebarItem
      icon={<BarChart3 size={20} />}
      label="Analytics"
      active={activeSection === "Analytics"}
      onClick={() => onSelect("Analytics")}
    />
    <SidebarItem
      icon={<MessageSquareText size={20} />}
      label="Reviews"
      active={activeSection === "Reviews"}
      onClick={() => onSelect("Reviews")}
    />
    <SidebarItem
      icon={<Settings size={20} />}
      label="Settings"
      active={activeSection === "settings"}
      onClick={() => onSelect("settings")}
    />
    <SidebarItem
      icon={<LogOut size={20} />}
      label="Logout"
      onClick={() => alert("Logged out")}
    />
  </nav>
);

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-orange-100 ${
      active ? "bg-orange-200 font-semibold" : ""
    }`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default Dashboard;
