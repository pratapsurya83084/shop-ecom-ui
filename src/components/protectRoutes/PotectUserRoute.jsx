import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PotectUserRoute = ({ children }) => {
  const user = Cookies.get("adminToken")||Cookies.get("googleAuthToken") || Cookies.get("AuthToken");

  // If no token, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, show the protected page
  return children;
};



export default PotectUserRoute
