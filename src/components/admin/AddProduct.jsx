import axios from "axios";
import React, { useState } from "react";
import { Toast } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const AddProduct = () => {
  const [newProduct, setProducts] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    qty: "",
    imgsrc: "",
  });

  const addedProducts = async (e) => {
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.qty ||
      !newProduct.imgsrc
    ) {
      toast.error("All fields are required");
      return;
    }
    e.preventDefault();
    console.log("Submitting product:", newProduct);

    try {
      const response = await axios.post(
        "http://localhost:1000/api/product/addproducts",
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response:", response.data);
      if (response.data.product) {
        toast.success("product added successfully");
      } else {
        toast.error("product added fails try again!");
      }
      // Optionally reset form
      setProducts({
        title: "",
        description: "",
        category: "",
        price: "",
        qty: "",
        imgsrc: "",
      });
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-xl mx-auto my-20 p-8 shadow-lg rounded-lg bg-white">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold text-center mb-8">Add New Product</h1>

      <form
        //  onSubmit={addedProducts}
        className="flex flex-col gap-6"
      >
        <label htmlFor="category">Enter product title:</label>
        <input
          type="text"
          name="title"
          value={newProduct.title}
          onChange={handleChange}
          placeholder="Enter product title"
          required
          className="p-3 border rounded-lg"
        />
        <label htmlFor="category">Enter product description:</label>
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Enter product description"
          className="p-3 border rounded-lg"
          required
        />
        <label htmlFor="category">Choose a category:</label>
        <select
          name="category"
          id="category"
          value={newProduct.category}
          onChange={handleChange}
          required
          className="p-3 border rounded-lg"
        >
          <option value="">Select category</option>
          <option value="mens">Mens</option>
          <option value="womens">Womens</option>
          <option value="electronics">Electronics</option>
          <option value="trending">Trending</option>
          <option value="kids">Kids</option>
          <option value="bestselling">Best Selling</option>
        </select>
        <label htmlFor="category">Enter product price:</label>
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Enter product price"
          required
          className="p-3 border rounded-lg"
        />
        <label htmlFor="category">Enter product quantity:</label>
        <input
          type="number"
          name="qty"
          value={newProduct.qty}
          onChange={handleChange}
          placeholder="Enter quantity"
          className="p-3 border rounded-lg"
          required
        />
        <label htmlFor="category">Enter product image URL:</label>
        <input
          type="text"
          name="imgsrc"
          value={newProduct.imgsrc}
          onChange={handleChange}
          placeholder="Image URL..."
          className="p-3 border rounded-lg"
          required
        />
      </form>
      <div className="flex  items-center justify-center">
        <button
          onClick={(e) => addedProducts(e)}
          className="bg-green-600 hover:bg-green-700  px-3 text-white py-3 rounded-lg mt-4 transition duration-300"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
