import React, { useContext, useState, useEffect } from "react";
import Outlet from "../Outlet";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import ContextProvider from "../context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";
import DarkMode from "../Navbar/DarkMode";
import { Link } from "react-router-dom";
const AllProducts = () => {
  const { products, addToCart } = useContext(ContextProvider);
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
      <div className="dark:bg-gray-900 dark:text-white ">
        {/* Marquee */}
        <div className="w-full overflow-hidden whitespace-nowrap bg-red-600 py-3">
          <marquee className="text-white text-sm font-semibold inline-block">
            🔥 Big Sale Today! Up to 50% Off on Men's, Fashion, and More! 🛒
            Hurry While Stocks Last! 🔥
          </marquee>
        </div>

        {/* Filter Buttons  category*/}
        <div className="dark:bg-gray-900 dark:text-white   p-2 flex justify-center items-center flex-wrap gap-1 sm:gap-4 md:gap-6 mb-6">
          <Toaster position="top-right" reverseOrder={false} />
          {["All", "Electronics", "Mens", "Womens", "Kids"].map((cat) => (
            <button
              key={cat}
              onClick={() => CategorySelect(cat)}
              className="px-2 py-2  md:px-3 md:py-2  rounded-lg text-sm font-medium dark:border bg-slate-200 dark:bg-gray-900  dark:text-white"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="p-6 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProd?.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found in this category.
            </p>
          ) : (
            categoryProd?.map((product, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="dark:bg-gray-900 dark:text-white border rounded-xl shadow-md overflow-hidden"
              >
                {/* Product Image */}
                <Link to={`/allSinglepage/${product._id}`}>
                  <div className="flex justify-center items-center p-4">
                    <img
                      src={product.imgsrc}
                      alt={product.title}
                      className="w-36 h-36 object- rounded-md"
                    />
                  </div>
                </Link>
                {/* Product Details */}
                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold ">{product.title}</h2>

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
