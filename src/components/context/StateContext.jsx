import React, { useEffect, useState } from "react";
import axios from "axios";
import ContextProvider from "./ContextProvider";

const StateContext = ({ children }) => {
  const [products, setProducts] = useState();
  const [Users, setUsers] = useState();
  const [cart, setCart] = useState([]);
  const [UserAddress, setUserAddress] = useState([]);
  const [allorder, setAllorder] = useState([]);
 
  const url = "http://localhost:1000/api";
  const getAllProducts = async () => {
    try {
      const api = await axios.get(
        "http://localhost:1000/api/product/getallproduct"
      );
      setProducts(api.data.products);

      // console.log(api.data);
    } catch (error) {
      console.log("server error : ", error);
    }
  };

  // console.log("product :", products);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllUsers = async () => {
    try {
      const api = await axios.get("  http://localhost:1000/api/user/allusers", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUsers(api.data.users);

      // console.log(api.data.users);
    } catch (error) {
      console.log("server error : ", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const DeleteUserIdwise = async (Userid) => {
    try {
      if (!Userid) {
        toast.error("userId not found ");
        return;
      }

      const api = await axios.delete(
        `http://localhost:1000/api/user/deleteuser/${Userid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(api.data);
      return api.data;
    } catch (error) {
      console.log("server error occured :", error);
    }
  };

  const GetUserOrders = async () => {
    try {
      const api = await axios.get(
        `http://localhost:1000/api/payment/allorder`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(api.data);
      return api.data;
    } catch (error) {
      console.log("server error occured :", error);
    }
  };

  const addToCart = async (productid, title, price, qty, imgsrc) => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/cart/add",
        { productid, title, price, qty, imgsrc },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, //
        }
      );
      // Immediately update the cart

      updateCart();

      // console.log(response.data);
      return response.data.cart;
    } catch (error) {
      console.error(
        "Server error occurred:",
        error.response?.data || error.message
      );
    }
  };

  //get cart products
  const GetUserCart = async () => {
    try {
      const api = await axios.get(`http://localhost:1000/api/cart/userCart`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data);
      return api.data;
    } catch (error) {
      console.log("server error occured :", error);
      return { cart: { items: [] } };
    }
  };
  // Initialize cart data
  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await GetUserCart();
      setCart(cartData.cart.items);
    };
    fetchCart();
  }, []);

  //increase qty
  const DecreaseQty = async (qty, productid) => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/cart/--qty",
        { qty, productid },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // <-- MUST be lowercase and enabled!
        }
      );
      updateCart();

      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Server error occurred:",
        error.response?.data || error.message
      );
    }
  };

  //Decrease qty
  const IncreaseQty = async (qty, productid) => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/cart/--incqty",
        { qty, productid },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // <-- MUST be lowercase and enabled!
        }
      );

      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Server error occurred:",
        error.response?.data || error.message
      );
    }
  };

  //remmove from cart
  const RemmoveFromCart = async (productid) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/cart/removeCart/${productid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // <-- MUST be lowercase and enabled!
        }
      );
      updateCart();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Server error occurred:",
        error.response?.data || error.message
      );
    }
  };

  const updateCart = async () => {
    //call removecart and add to cart function
    const cartData = await GetUserCart();
    setCart(cartData.cart.items);
  };
  //addaddress shipping
  const Addressinfo = async (
    fullname,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    if (
      fullname &&
      address &&
      city &&
      state &&
      country &&
      pincode &&
      phoneNumber
    ) {
      const api = await axios.post(
        `http://localhost:1000/api/address/addaddress`,
        { fullname, address, city, state, country, pincode, phoneNumber },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: localStorage.getItem("token")?.replace(/^"|"$/g, ""), // Send the token correctly
          },
          withCredentials: true,
        }
      );
      return api.data;
    } else {
      alert("Please fill all the fields");
    }
  };

  // get address
  const getUserAddress = async () => {
    const api = await axios.get(
      `http://localhost:1000/api/address/getUserAddress`,
      {
        headers: {
          "Content-Type": "application/json",
          Auth: localStorage.getItem("token")?.replace(/^"|"$/g, ""), // Send the token correctly
        },
        withCredentials: true,
      }
    );

    // console.log("user address : ", api.data.address);

    setUserAddress(api.data.address);
  };

//all user order
  const getAllOrder = async () => {
    try {
      const api = await axios.get(`${url}/payment/allorder`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data);

      return api.data;

      // setAllorder(api.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  useEffect(() => {
    getUserAddress();
  }, []);





  const GetuserOrder = async () => {
    try {
      const api = await axios.get(`http://localhost:1000/api/payment/userorder`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data);

      return api.data;

      // setAllorder(api.data)
    } catch (error) {
      console.log(error);
    }
  };


    const clearCartAll = async () => {
    try {
      const api = await axios.delete(`${url}/cart/clear`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    
      console.log(api.data);
      return api.data;

    } catch (error) {
      console.log("failed clear cart : ", error.message);
    }
  };

const GetuserProfile = async () => {
  try {
    const api = await axios.get(`http://localhost:1000/api/user/profile`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("User Profile Data:", api.data);
    return api.data;
  } catch (error) {
    console.log("Error fetching user profile:", error);
    return null;
  }
};



  return (
    <ContextProvider.Provider
      value={{
        products,
        Users,
        DeleteUserIdwise,
        GetUserOrders,
        addToCart,
        GetUserCart,
        IncreaseQty,
        DecreaseQty,
        RemmoveFromCart,
        updateCart,
        cart,
        Addressinfo,
        UserAddress,
        getAllOrder,
        GetuserOrder,
        GetuserProfile,
        
        url,
        clearCartAll
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default StateContext;
