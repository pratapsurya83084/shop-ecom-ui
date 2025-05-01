import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const adminToken = Cookies.get("adminToken");

  // If no token, redirect to login
  if (!adminToken) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, show the protected page
  return children;
};

export default ProtectRoute;
