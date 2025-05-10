import React, { useEffect, useState } from "react";
import axios from "axios";
import ContextProvider from "./ContextProvider";
const StateContext = ({ children }) => {
  const [products, setProducts] = useState();
  const [Users, setUsers] = useState();

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
          withCredentials: true, // <-- MUST be lowercase and enabled!
        }
      );

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
    }
  };

  //increase qty
  const  DecreaseQty= async (qty , productid) => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/cart/--qty",
        { qty , productid },
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

    //Decrease qty
  const IncreaseQty = async (qty,productid) => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/cart/--incqty",
        { qty , productid },
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
        DecreaseQty
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default StateContext;
