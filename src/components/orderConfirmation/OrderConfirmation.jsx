import React, { useState, useContext, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import ContextProvider from "../context/ContextProvider";
import Outlet from "../Outlet";
const OrderConfirmation = () => {
  const { GetuserOrder } = useContext(ContextProvider);
  const [latestOrder, setLatestOrder] = useState(GetuserOrder);


  useEffect(() => {
    async function fetOrder() {
      try {
        const order = await GetuserOrder();
        console.log("Fetched Orders:", order);
        if (order && order.orderDetails && order.orderDetails.length > 0) {
          const latest = order.orderDetails[order.orderDetails.length - 1];
          setLatestOrder(latest);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    }
    fetOrder();
   

  }, [GetuserOrder]);

  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
   <Outlet>
     <div className="min-h-screen dark:bg-black    dark:text-white p-6">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left Section: Product Details */}
        <div className="lg:w-2/3 w-full">
          <h3 className="text-lg font-semibold dark:text-white text-gray-700 mb-4">Order Confirmed, deliver within 4 days</h3>
          {latestOrder && latestOrder.orderItems && latestOrder.orderItems.length > 0 ? (
            <div className="space-y-4">
              {latestOrder.orderItems.map((data, i) => (
                <div key={i} className="flex items-center dark:bg-slate-900 p-4 rounded-lg shadow-md">
                  <img
                    src={data.imgsrc}
                    alt="Product"
                    className="w-20 h-20 rounded-lg object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h5 className="text-indigo-600 font-semibold">{data.title}</h5>
                    <p className="dark:text-white    text-gray-600">Qty: {data.qty}</p>
                  </div>
                  <p className="dark:text-white        text-gray-800 font-semibold">₹{data.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent orders found.</p>
          )}
        </div>

        {/* Right Section: Order Summary */}
        <div className="lg:w-1/3 w-full">
          <div className="dark:bg-slate-900 shadow-md p-6 rounded-lg sticky top-6">
            <h5 className="text-lg font-semibold text-gray-700 mb-4">Shipping Address</h5>
            {latestOrder && latestOrder.userShippingaddress ? (
              <div className="space-y-2 mb-6">
                <p>Name: {latestOrder.userShippingaddress.fullname}</p>
                <p>Address: {latestOrder.userShippingaddress.address}</p>
                <p>City: {latestOrder.userShippingaddress.city}</p>
                <p>State: {latestOrder.userShippingaddress.state}</p>
                <p>ZIP Code: {latestOrder.userShippingaddress.pincode}</p>
                <p>Phone: {latestOrder.userShippingaddress.phoneNumber}</p>
              </div>
            ) : (
              <p className="text-gray-500">No shipping address available.</p>
            )}

            <h5 className="text-lg font-semibold dark:text-gray-700 mb-4">Payment Information</h5>
            {latestOrder ? (
              <div className="space-y-2">
                <p>Order ID: {latestOrder.order_id}</p>
                <p>Payment ID: {latestOrder.payment_id}</p>
                <p className="font-semibold">Total Amount: ₹{latestOrder.amount}</p>
              </div>
            ) : (
              <p className="text-gray-500">No payment information available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
   </Outlet>
  );
};

export default OrderConfirmation;
