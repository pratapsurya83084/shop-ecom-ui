import React from "react";
import Outlet from '../Outlet';
import { Star, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
const bestSellingProducts = [
  {
    id: 1,
    name: "Noise Cancelling Headphones",
    price: "₹2999",
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UF894,1000_QL80_.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Fitness Tracker Band",
    price: "₹1299",
    image: "https://th.bing.com/th/id/OIP.6zseKNIc5q_sMRN2eEDYmwHaHa?rs=1&pid=ImgDetMain",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "₹899",
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Portable Power Bank",
    price: "₹1199",
    image: "https://th.bing.com/th/id/OIP.RvrVVgm5vRSOgGT9stzLeAHaGk?rs=1&pid=ImgDetMain",
    rating: 4.7,
  },
];

export default function BestSelling() {
  return (
    <Outlet>
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-xl md:text-3xl font-bold mb-6 text-center">
          Best Selling Products
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {bestSellingProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform overflow-hidden"
            >
              <Link to={`/bestSelinglePage/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-"
              />
              </Link>
              <div className="p-3 flex flex-col gap-2">
                <div className="flex justify-between text-sm font-medium">
                  <h2>{product.name}</h2>
                  <span className="text-red-600 font-semibold">{product.price}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 text-xs">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={14}
                      fill={index < Math.floor(product.rating) ? "#facc15" : "none"}
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <button className="mt-1 w-full flex items-center justify-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-sm py-1.5 rounded-md transition">
                  <ShoppingBag size={14} /> Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Outlet>
  );
}
