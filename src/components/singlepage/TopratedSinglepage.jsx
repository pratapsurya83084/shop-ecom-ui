import React from "react";
import Outlet from "../Outlet";
import { useParams } from "react-router-dom";
// Your brands array
const topRated = [
  {
    id: 33,
    name: "Noise Cancelling Headphones",
    image:
      "https://th.bing.com/th/id/OIP.w9Y1SbsjyiVHZxsSkoLzNQHaMU?rs=1&pid=ImgDetMain",
    price: "₹2999",
    rating: 4.8,
  },
  {
    id: 34,
    name: "4K Smart LED TV",
    image: "https://images-na.ssl-images-amazon.com/images/I/910pOl2XQ9L.jpg",
    price: "₹21999",
    rating: 4.9,
  },
  {
    id: 35,
    name: "Wireless Mouse",
    image:
      "https://th.bing.com/th/id/OIP.HLsHKOuhAz3lAxhk2FPrOwHaHa?rs=1&pid=ImgDetMain",
    price: "₹499",
    rating: 4.7,
  },

  {
    id: 36,
    name: "Laptop apple",
    image:
      "https://microless.com/cdn/products/44161b03532a6fdf5e8b9b50a52f56c9-hi.jpg",
    price: "₹129990",
    rating: 4.7,
  },

  {
    id: 37,
    name: "iphone 15 pro max",
    image:
      "https://esim-compatible-phones.com/wp-content/uploads/2024/06/iPhone-15-Pro-Max.jpg",
    price: "₹150000",
    rating: 4.9,
  },

  {
    id: 38,
    name: "Long sleeve t-shirt",
    image:
      "https://i5.walmartimages.com/asr/3655bc7b-48e5-453c-a494-f1ddabeb7f92_1.9838d30a904832448a4d13b9d3edd737.jpeg",
    price: "₹150000",
    rating: 4.9,
  },
];

const TopratedSinglepage = () => {
  const { id } = useParams();

  //   console.log(parseInt(id));

  const newArray = topRated.filter((pid) => pid.id === Number(id));
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
                alt={product.name}
                className="w-52 h-80 "
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              <p className="text-gray-600 mb-6">
                This product is made with high-quality materials and offers you
                the best comfort and style.
              </p>

              <p>₹.{product.price}</p>
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

export default TopratedSinglepage;
