import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ContextProvider from "../context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";

const GetAllProducts = () => {
  const { products } = useContext(ContextProvider);
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    setLocalProducts(products); // sync with context initially
  }, [products]);

  const deletProd = async (id) => {
    try {
      if (!id) return toast.error("ID not found");

      const res = await axios.delete(`http://localhost:1000/api/product/${id}`);
      if (res.data.delete === true) {
        toast.success("Deleted successfully");
        setLocalProducts(prev => prev.filter(prod => prod._id !== id)); // remove from local state
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.log("Server error:", error);
      toast.error("Server error");
    }
  };

  return (
    <div className="overflow-x-auto mt-10">
      <Toaster position="top-right" />
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Sr. No</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Qty</th>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {localProducts && localProducts.length > 0 ? (
            localProducts.map((product, index) => (
              <tr key={product._id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">₹.{product.price}</td>
                <td className="px-4 py-2">{product.qty}</td>
                <td className="px-4 py-2">
                  <img src={product.imgsrc} alt="product" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                    Edit
                  </button>
                  <button
                    onClick={() => deletProd(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllProducts;
