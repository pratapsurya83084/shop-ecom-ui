import React, { useContext, useState } from "react";
import ContextProvider from "../context/ContextProvider";
import toast,{Toaster} from "react-hot-toast";
import {useNavigate}   from 'react-router-dom'
const ProceedToCheckoutForm = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
const {Addressinfo} = useContext(ContextProvider);
const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!address.fullname) newErrors.fullname = "Full Name is required";
    if (!address.address) newErrors.address = "Address is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.state) newErrors.state = "State is required";
    if (!address.country) newErrors.country = "Country is required";
    if (!address.pincode) newErrors.pincode = "Pincode is required";
    if (!address.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = async() => {
    if (validateForm()) {
      console.log("Order confirmed with address:", address);
      //call api
      const apiAddres = await Addressinfo(address.fullname,address.address,address.city,address.state,address.country,address.pincode,address.phoneNumber);
      console.log("your confirm address is submitted :",apiAddres.UserData);
      if (apiAddres.UserData) {
        toast.success("address confirm successfull")
        navigate("/checkout")
      }

    }
  };

  const handleOldAddress = () => {
    console.log("Using old address");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Proceed to Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form className="space-y-">
              <Toaster position="top-right" reverseOrder={false} />
          <div>
            
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={address.fullname}
              onChange={handleInputChange}
              className="w-full p-2 text-black border border-gray-300 rounded"
              placeholder="Enter your full name"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={address.address}
              onChange={handleInputChange}
              className="w-full p-2 text-black border border-gray-300 rounded"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                className="w-full p-2 border text-black border-gray-300 rounded"
                placeholder="City"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleInputChange}
                className="w-full p-2 border text-black border-gray-300 rounded"
                placeholder="State"
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleInputChange}
                className="w-full p-2 text-black border border-gray-300 rounded"
                placeholder="Country"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input
                type="number"
                name="pincode"
                value={address.pincode}
                onChange={handleInputChange}
                className="w-full p-2 text-black border border-gray-300 rounded"
                placeholder="Pincode"
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm">{errors.pincode}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              value={address.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border text-black border-gray-300 rounded"
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
        </form>
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleConfirmOrder}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Confirm Order
          </button>
          <button
            onClick={handleOldAddress}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
          >
            Old Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProceedToCheckoutForm;
