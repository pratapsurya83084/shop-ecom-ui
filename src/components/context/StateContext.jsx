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


  return (
    <ContextProvider.Provider value={{ products, Users ,DeleteUserIdwise ,GetUserOrders}}>
      {children}
    </ContextProvider.Provider>
  );
};

export default StateContext;
