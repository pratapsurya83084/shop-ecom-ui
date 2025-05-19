import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  //google login

const [googlCreadential,setGoogleLoginCreadential]=useState();
   const url ="http://localhost:1000/api"
// ="https://mernstack1stproject-7.onrender.com/api" 
let navigate = useNavigate();
const Formtoken = Cookies.get("AuthToken") 
// || Cookies.get("googleAuthToken");
const googlAuthToken = Cookies.get("googleAuthToken");

  const handleSuccess = (credentialResponse) => {
    if (Formtoken) {
      toast.error("user already logged with another Account")
    return
    }
    const decoded = jwtDecode(credentialResponse.credential);
    // console.log("token googleToken :",credentialResponse.credential); //token print

    // console.log("User Info:", decoded);
    const googleToken = credentialResponse.credential;
    //api for googleLogin




    if (googleToken) {
      const googleAuth = async () => {
        try {
          const req = await axios.post(
           `${url}/user/google/auth`,
            { googleToken }, // Make sure to send the token properly
            {
              headers: {
                "Content-type": "application/json",
              },
              withCredentials: true,
            }
          );
          console.log(req.data.user);
         
        if (req.data.user.success==true) {
        
          localStorage.setItem("googleAuth",JSON.stringify(req.data.user));
          navigate("/");

        }
        } catch (error) {
          console.error("Error during Google login API call:", error);
        }
      };
      googleAuth();
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      alert("Please fill in both fields.");
      return;
    }

   
    // You'd send this to your backend
    // console.log("Login submitted:", formData);
    if (formData) {
      if (googlAuthToken) {
        // alert("user already logged with google account ");
        toast.error('user already logged with google account ');
        return;
      }
      try {
        const req = await axios.post(
         `${url}/user/login`,
          formData, // Make sure to send the token properly
          {
            headers: {
              "Content-type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(req.data);
       
        setGoogleLoginCreadential(req.data);
        if (req.data.sucess === true) {
          toast.success(req.data.message);
          localStorage.setItem("formloginData",JSON.stringify(req.data));
          // alert(req.data.message);
      
          navigate("/");
   
        } else {
          // alert(req.data.message);
          toast.error(req.data.message);
        }
      } catch (error) {
        console.error("Error during Google login API call:", error);
      }
    } else {
      alert("all fields are required");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
       <Toaster position="top-right" reverseOrder={false} />
      <div className="space-y- bg-white md:w-96">
        {/* Email/Password Login Form */}

        <form
          onSubmit={handleSubmit}
          className=" p-5 rounded-2xl  w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Login
          </h2>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
          >
            Log In
          </button>
        </form>
        {/* signup */}
        <div className="flex justify-end px-3 text-sm">
          <span>
            If you don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </span>
        </div>

        <p className="text-center">OR</p>
        {/* Google Login Button */}
        <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md text-center">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </div>
  
    </div>
  );
};

export default Login;
