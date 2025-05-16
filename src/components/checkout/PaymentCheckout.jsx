import React, { useContext, useEffect, useState } from "react";
import ContextProvider from "../context/ContextProvider";
import Outlet from "../Outlet";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const PaymentCheckout = () => {
  const { GetUserCart, UserAddress ,url,clearCartAll} = useContext(ContextProvider);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  // console.log(UserAddress);
  
// const [Address ,setUserAddress]=useState();
  useEffect(() => {
    const fetchCart = async () => {
      const cartItem = await GetUserCart();
      setCart(cartItem.cart.items);
    };
    fetchCart();
  }, [GetUserCart]);
// console.log(cart);
// console.log(UserAddress);

const totalPrice = cart.reduce((sum, product) => sum + product.price * (product.quantity || 1), 0);

  // console.log(totalPrice);

  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};



const handlepay = async () => {
  console.log("Proceeding to payment...");

  const isRazorpayLoaded = await loadRazorpayScript();

  if (!isRazorpayLoaded) {
    console.log("Failed to load Razorpay SDK");
    return;
  }

  try {
    const paymentresponse = await axios.post(`${url}/payment/checkout`, {
      amount: totalPrice,
      cartItems: cart,
      usershipping: UserAddress,
      userid: UserAddress.userId,
    });

    console.log("Order Details:", paymentresponse.data);

    const { orderId, amount: orderAmount } = paymentresponse.data;

    if (!orderId || !orderAmount) {
      console.log("Invalid order response:", paymentresponse.data);
      return;
    }

    const options = {
      key: "rzp_test_5mOSYhsNR3SAHg", // Consider moving to backend
      amount: orderAmount * 100,
      currency: "INR",
      name: "ShopSy",
      description: "Order Payment",
      image: "https://files.oaiusercontent.com/file-H2yfq5Q1siiWFtKZzLBEoD",
      order_id: orderId,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        const paymentData = {
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          payment_signature: razorpay_signature,
          amount: orderAmount,
          orderItems: cart,
          userId: UserAddress.userId,
          userShippingaddress: UserAddress,
        };

        try {
          const verifyResponse = await axios.post(`${url}/payment/verify-payment`, paymentData, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log("Verification Response:", verifyResponse.data);

          if (verifyResponse.data.success) {
            navigate('/orderconfirmation');
       await clearCartAll();
          } else {
            console.log("Payment verification failed.");
          }
        } catch (error) {
          console.log("Verification error:", error);
        }
      },
      prefill: {
        email: "cartnest008@gmail.com",
        contact: "9000090000",
      },
      notes: {
        address: "CartNest Corporate Office, Pune",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();

    razorpayInstance.on('payment.failed', function (response) {
      console.log("Payment failed:", response.error);
    });

  } catch (error) {
    console.log("Order creation failed:", error);
    alert("product is not found in cart");
  }
};



  return (
    <Outlet>
      <div className="dark:bg-black    dark:text-white flex flex-col justify-center justify-content-center items-center md:flex ">
        <div className="mb-10 md:flex justify-center items-center justify-content-center gap- mt-16 gap-20 md:px-4">
          {/* Left Side - Product Details */}
          <div className="dark:bg-slate-900 shadow-lg rounded-lg p- w- md:w-96 space-y-10">
            <h2 className="text-xl p-4 font-semibold darak:text-gray-400 mb-4">
              Your Cart Items
            </h2>

            {!cart == null || !cart?.length == 0 ? (
              cart?.map((item, index) => (
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
                      <h1 className="font-semibold text-gray-800">
                        {item.title}
                      </h1>
                      <p className="text-gray-600">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p className="text-indigo-600 font-bold text-lg">
                    ₹.{item.price}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 p-5">Your cart is empty.</p>
            )}
          </div>

          {/* Right Side - Shipping Address */}
          <div className="mt-20 mb-10 md:mb-0 md:mt-0  dark:bg-slate-900 shadow-lg rounded-lg p-5 md:p-6 md:w-62 lg:w-72">
            <h5 className="text-xl font-semibold text-gray-700 mb-4">
              Shipping Address
            </h5>
            <hr className="mb-4 border-gray-300" />
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>Name:</strong> { UserAddress?UserAddress.fullname:""}
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> {UserAddress?UserAddress.address:""}
              </p>
              <p className="text-gray-600">
                <strong>City:</strong> { UserAddress?UserAddress.city:""}
              </p>
              <p className="text-gray-600">
                <strong>State:</strong> { UserAddress?UserAddress.state:""}
              </p>
              <p className="text-gray-600">
                <strong>ZIP Code:</strong> { UserAddress?UserAddress.pincode:""}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Phone:</strong> { UserAddress?UserAddress.phoneNumber:""}
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
