import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
const Outlet = ({ children }) => {
return(
    <>
      <Navbar />
    {children}
    <Footer />
    </>
  
)
};

export default Outlet;
