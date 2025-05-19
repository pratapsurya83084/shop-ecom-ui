import React, { useContext, useEffect, useState } from "react";
import Outlet from "../Outlet";
import ContextProvider from "../context/ContextProvider";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { GetuserProfile, googleprofile, GetuserOrder } =
    useContext(ContextProvider);
  const [profile, setProfile] = useState();
  const [UserOrder, setUserOrder] = useState();
  const [googleProfile, setGoogleprofile] = useState();
  const navigate = useNavigate();
  // console.log(googleProfile);
     const url ="http://localhost:1000/api"
// const url ="https://mernstack1stproject-7.onrender.com/api" 
  useEffect(() => {
    async function getProfile() {
      const getProfile = await GetuserProfile();
      // const googleprofile = await googleprofile();
      // console.log(getProfile);
      setProfile(getProfile);
      // setGoogleprofile(googleprofile);
      const Userorder = await GetuserOrder();
      setUserOrder(Userorder.orderDetails);

      // console.log(Userorder);
    }
    getProfile();
  }, []);
  // console.log(UserOrder);

  useEffect(() => {
    async function fetGoogleUserProfile() {
      //get google login userProfile

      try {
        const api = await axios.get(
          `${url}/user/googleprofile`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setGoogleprofile(api.data.userProfile);
        // console.log("User Profile Data:", api.data);
        return api.data;
      } catch (error) {
        console.log("Error fetching user profile:", error);
        return null;
      }
    }

    fetGoogleUserProfile();
  }, []);

  const FormhandleSignOut = async () => {
    try {
      const logoutUser = await axios.post(
        `${url}/user/formLogout`,
        {},
        { withCredentials: true }
      );
      const logoutUserGoogle = await axios.post(
       `${url}/user/googleLogout`,
        {},
        { withCredentials: true }
      );

      // console.log("logout googleAuth :", logoutUser.data);
      if (logoutUserGoogle.data.success == true) {
        // console.log("google :",logoutUserGoogle.data);
        toast.success("logout successfull");
        localStorage.removeItem("googleAuth");

        navigate("/login");
      } else {
        toast.success("logout failed");
      }

      //   console.log(" logout formlogin :", logoutUser.data);
      if (logoutUser.data.status == true) {
        console.log("formlogout :", logoutUser.data);

        toast.success("logout successfull");

        navigate("/login");
        localStorage.removeItem("formloginData");
      } else {
        toast.error("logout failed");
      }
    } catch (error) {
      console.log("failed logout : ", error);
    } // or navigate to login page
  };
  return (
    <Outlet>
      <div className="dark:bg-black dark:text-white ">
   <div className=" max-w-6xl mx-auto p-6 ">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="dark:text-white  dark:border border-gray-500 shadow rounded-lg p-4 h-fit">
            <div className="flex flex-col items-center text-center">
              <img
                src={"profile.jpg"}
                alt="User"
                className="w-24 h-24 rounded-full mb-2 object-cover"
              />
              <h2 className="text-lg font-semibold">
                {profile ? profile?.name : googleProfile?.name}
              </h2>
              <p className="text-sm dark:text-white">
                {profile ? profile?.email : googleProfile?.email}
              </p>
            </div>
            <nav className="mt-6">
              <ul className="space-y-2 text-sm font-medium dark:text-white">
                <li>
                  <ol className="w-full text-left hover:text-blue-600">
                    My Orders : total order({UserOrder?.length}){" "}
                  </ol>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6 ">
            <div className="bg-  dark:border border-gray-500 shadow rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">Profile Information</h3>
                  <p className="text-sm dark:text-white">
                    View your personal details
                  </p>
                </div>
                <button
                  onClick={FormhandleSignOut}
                  className="text-blue-600 hover:underline"
                >
                  Logout
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm dark:text-white">Full Name</label>
                  <p className="dark:text-white">
                    {profile ? profile?.name : googleProfile?.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm dark:text-white">Email Address</label>
                  <p className="dark:text-white">
                    {profile ? profile?.email : googleProfile?.email}
                  </p>
                </div>

                <div>
                  <label className="text-sm dark:text-white">
                    Profile Created
                  </label>

                  <p className="dark:text-white">
                    {profile || googleProfile?.createdAt
                      ? new Date(
                          profile
                            ? profile?.createdAt
                            : googleProfile?.createdAt
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Date not available"}
                  </p>
                </div>
              </div>
            </div>

            <div className="dark:bg-gray-900 dark:border border-gray-500 shadow rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>

              <div>
                {UserOrder?.length > 0 ? (
                  UserOrder?.map((order, orderIndex) => (
                    <div
                      key={orderIndex}
                      className="mb-4 p-4 bg- shadow-md dark:border border-gray-500 rounded-lg"
                    >
                      <h2 className="text-lg dark:text-white font-semibold mb-2">
                        Order ID: {order?.order_id}
                      </h2>
                      <h3 className="dark:text-white mb-2">
                        Payment ID: {order?.payment_id}
                      </h3>
                      <h4 className="dark:text-white mb-2">
                        Total Amount: ₹{order?.amount}
                      </h4>
                      <h5 className="dark:text-white mb-2">
                        Order Date:{" "}
                        {new Date(order?.orderDate).toLocaleDateString()}
                      </h5>

                      <div className="space-y-2">
                        {order.orderItems?.length > 0 ? (
                          order?.orderItems.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center gap-4 p-2 dark:text-white rounded-lg"
                            >
                              <img
                                src={item.imgsrc}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div>
                                <h3 className="text-indigo-600 font-semibold">
                                  {item.title}
                                </h3>
                                <p>Price: ₹{item.price}</p>
                                <p>Quantity: {item.qty}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="dark:text-white">
                            No items in this order.
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No orders found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
   
    </Outlet>
  );
};

export default UserProfile;
