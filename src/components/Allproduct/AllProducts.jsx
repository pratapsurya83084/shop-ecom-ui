

import React, { useContext, useState, useEffect } from "react";
import Outlet from "../Outlet";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import ContextProvider from "../context/ContextProvider";

const AllProducts = () => {
  const { products ,addToCart } = useContext(ContextProvider);
  const [categoryProd, setCategoryProd] = useState([]);

  useEffect(() => {
    if (products) {
      setCategoryProd(products);
    }
  }, [products]);

  const CategorySelect = (prodCategory) => {
    if (prodCategory === "All") {
      setCategoryProd(products);
      return;
    }

    const selected = products.filter(
      (prod) => prod.category?.toLowerCase() === prodCategory.toLowerCase()
    );
    setCategoryProd(selected);
  };

  return (
    <Outlet>
      <div>
        {/* Marquee */}
        <div className="w-full overflow-hidden whitespace-nowrap bg-red-600 py-3">
          <marquee className="text-white text-sm font-semibold inline-block">
            🔥 Big Sale Today! Up to 50% Off on Men's, Fashion, and More! 🛒 Hurry While Stocks Last! 🔥
          </marquee>
        </div>

        {/* Filter Buttons */}
        <div className="bg-slate-100 p-6 flex justify-center items-center flex-wrap gap-2 sm:gap-4 md:gap-6 mb-6">
          {["All", "Electronics", "Mens", "Womens", "Kids"].map((cat) => (
            <button
              key={cat}
              onClick={() => CategorySelect(cat)}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="p-6 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProd?.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No products found in this category.</p>
          ) : (
            categoryProd?.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Product Image */}
                <div className="flex justify-center items-center p-4">
                  <img
                    src={product.imgsrc}
                    alt={product.title}
                    className="w-36 h-36 object- rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h2>

                  <div className="text-lg text-red-600 font-bold mt-2">
                    ₹. {product.price}
                  </div>

                  {/* <div className="flex justify-center gap-1 text-yellow-500 mt-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        size={14}
                        fill={index < Math.floor(product.rating) ? "#facc15" : "none"}
                        stroke="#facc15"
                        strokeWidth={1}
                      />
                    ))}
                  </div> */}

                  <button 
                  onClick={()=>addToCart(product._id,product.title, product.price, product.qty, product.imgsrc)}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2 rounded-lg transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </Outlet>
  );
};

export default AllProducts;
