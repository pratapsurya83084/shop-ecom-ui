import React, { useState } from "react";
import axios, { formToJSON } from 'axios';
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AdminLogin = ({ isOpen, onClose }) => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
   const url = "http://localhost:1000/api"
    // const url ="https://mernstack1stproject-7.onrender.com/api" 
const navigate = useNavigate();
  if (!isOpen) return null;

  const onsubmitAdminLogin = async (e) => {
    e.preventDefault();
    // console.log(email, password);
     const Formtoken = Cookies.get("AuthToken");
      // || Cookies.get("googleAuthToken");
      const googlAuthToken = Cookies.get("googleAuthToken");
    //   console.log(Formtoken,googlAuthToken);
      
    if (Formtoken || googlAuthToken) {
        
        toast.error("you are already looged with another account");
        return;
    }
    try {
        const adminLoginApi = await axios.post(
          `${url}/user/adminLogin`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // ✅ correct spelling and casing
          }
        );
        setSuccess("Login successful!");
        setError("");
        // console.log(adminLoginApi.data.status);
        if (adminLoginApi.data.status==true) {
            toast.success("admin login success");
            navigate("/dashboard")
        }else{
            toast.error("admin login failed")
        }
    } catch (error) {
        console.log("Server error:", error);
        setError(
          error?.response?.data?.message || "Something went wrong during login"
        );
        setSuccess("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}

        <form onSubmit={onsubmitAdminLogin}>
  <input
    type="email"
    placeholder="Enter email"
    value={email}
    onChange={(e) => setemail(e.target.value)}
    className="w-full border mb-3 px-3 py-2 rounded-xl text-black bg-white"
  />
  <input
    type="password"
    placeholder="Enter password"
    value={password}
    onChange={(e) => setpassword(e.target.value)}
    className="w-full border mb-4 px-3 py-2 rounded-xl text-black bg-white"
  />
  <button
    type="submit"
    className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600"
  >
    Login
  </button>
</form>

      </div>
    </div>
  );
};

export default AdminLogin;
