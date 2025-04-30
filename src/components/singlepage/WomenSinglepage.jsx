import React from "react";
import Outlet from "../Outlet";
import { useParams } from "react-router-dom";
// Your brands array
const brands = [
    {
      id: 20,
      image: "https://m.media-amazon.com/images/I/6143d3r6D0L._AC_UL480_FMwebp_QL65_.jpg",
      brand: "DKNY",
      offer: "MIN. 20% OFF",
            price:"700"
    },
    {
      id: 21,
      image: "https://m.media-amazon.com/images/I/81DRk+I9w4L._AC_UL480_FMwebp_QL65_.jpg",
      brand: "Just Cavalli",
      offer: "MIN. 20% OFF",
            price:"800"
    },
    {
      id: 23,
      image: "https://m.media-amazon.com/images/I/513zpgXL98L._AC_UL480_FMwebp_QL65_.jpg",
      brand: "GUESS",
      offer: "MIN. 30% OFF",
            price:"500"
    },
    {
      id: 24,
      image: "https://m.media-amazon.com/images/I/714nEfpvyqL._AC_UL480_FMwebp_QL65_.jpg",
      brand: "Polo Ralph Lauren",
      offer: "FLAT 40% OFF",
      price:"400"
    },
    {
      id: 25,
      image: "https://m.media-amazon.com/images/I/51RmqXyesGL._AC_UL480_FMwebp_QL65_.jpg",
      brand: "Fred Perry",
      offer: "UP TO 40% OFF",
            price:"600"
    },
    {
      id: 26,
      image: "https://m.media-amazon.com/images/I/71GxB8DJLyL._AC_UL480_FMwebp_QL65_.jpg",
      brand: "The Collective",
      offer: "FLAT 40% OFF",
      price:"500"
    },
  ];

const WomenSinglepage = () => {
  const { id } = useParams();

  //   console.log(parseInt(id));

  const newArray = brands.filter((pid) => pid.id === Number(id));
  console.log(newArray);

  return (
    <Outlet>
      <div className="p-6 max-w-6xl mx-auto grid gap-12">
        {newArray.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden shadow-lg flex justify-center items-center">
              <img
                src={product.image}
                alt={product.brand}
                className="w-52 h-96 "
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">{product.brand}</h1>
              <p className="text-2xl text-red-600 font-semibold mb-6">
                {product.offer}
              </p>
              <p className="text-gray-600 mb-6">
                This product is made with high-quality materials and offers you
                the best comfort and style.
              </p>
<p>₹.{product.price}</p>
              {/* Size Selector */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Select Size:</h3>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="border rounded-full px-4 py-2 hover:bg-indigo-100"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Outlet>
  );
};

export default WomenSinglepage;
