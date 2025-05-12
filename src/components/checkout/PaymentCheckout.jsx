import React, { useContext, useEffect, useState } from "react";
import ContextProvider from "../context/ContextProvider";
import Outlet from "../Outlet";

const PaymentCheckout = () => {
  const { GetUserCart, UserAddress } = useContext(ContextProvider);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const cartItem = await GetUserCart();
      setCart(cartItem.cart.items);
    };
    fetchCart();
  }, [GetUserCart]);

  const handlepay = () => {
    console.log("Proceeding to payment...");
  };

  return (
    <Outlet>
        <div className="flex flex-col justify-center justify-content-center items-center md:flex ">
  <div className=" md:flex justify-center items-center justify-content-center gap- mt-16 gap-20 md:px-4">
        {/* Left Side - Product Details */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cart Items</h2>

          {!cart == null || !cart.length == 0 ? (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="h-20 w-20 object-cover rounded-lg"
                    src={item.imgsrc}
                    alt={item.title}
                  />
                  <div>
                    <h1 className="font-semibold text-gray-800">{item.title}</h1>
                    <p className="text-gray-600">Qty: {item.qty}</p>
                  </div>
                </div>
                <p className="text-indigo-600 font-bold text-lg">
                  ₹.{item.price}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Right Side - Shipping Address */}
        <div className="mt-20 mb-10 md:mb-0 md:mt-0 bg-white shadow-lg rounded-lg p-6 w-96">
          <h5 className="text-xl font-semibold text-gray-700 mb-4">
            Shipping Address
          </h5>
          <hr className="mb-4 border-gray-300" />
          <div className="space-y-2">
            <p className="text-gray-600">
              <strong>Name:</strong> {UserAddress.fullname}
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> {UserAddress.address}
            </p>
            <p className="text-gray-600">
              <strong>City:</strong> {UserAddress.city}
            </p>
            <p className="text-gray-600">
              <strong>State:</strong> {UserAddress.state}
            </p>
            <p className="text-gray-600">
              <strong>ZIP Code:</strong> {UserAddress.pincode}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Phone:</strong> {UserAddress.phoneNumber}
            </p>
          </div>
          <button
            className="bg-indigo-500 text-white py-2 rounded-lg w-full hover:bg-indigo-600 transition-colors"
            onClick={handlepay}
          >
            Proceed to Payment
          </button>
        </div>

        </div>
    
      </div>
    </Outlet>
  );
};

export default PaymentCheckout;
