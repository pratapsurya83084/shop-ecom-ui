import React from "react";
import Outlet from '../Outlet';
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
  
  const trendingProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "₹1999",
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6267/6267219_rd.jpg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "₹1499",
    image: "https://m.media-amazon.com/images/I/61ftG19NACL._AC_SL1500_.jpg",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Running Shoes",
    price: "₹890",
    image: "https://media.landmarkshops.in/cdn-cgi/image/h=831,w=615,q=85,fit=cover/max-new/1000014449206-Multi-MULTI-1000014449206_01-2100.jpg",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: "₹3000",
    image: "https://i5.walmartimages.com/asr/afa9d092-f123-4a87-bee7-957d275b0fa2_1.54d062626b9d627d399adeba9a555418.jpeg",
    rating: 4.6,
  },
];

export default function Trending() {
  return (
    <Outlet>
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-xl md:text-3xl font-bold mb-6 text-center">
          Trending Products
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:scale-105 transition-transform overflow-hidden"
            >
              <Link to={`/TrendingSinglepage/${product.id}`}>   
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 md:h-52 "
              />
              </Link>
              
              <div className="p-3 flex flex-col gap-2">
                <div className="flex justify-between text-sm font-medium">
                  <h2>{product.name}</h2>
                  <span className="text-green-600 font-semibold">{product.price}</span>
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
                <button className="mt-1 w-full flex items-center justify-center gap-1 bg-rose-600 hover:bg-rose-700 font-semibold text-white text-sm py-1.5 rounded-md transition">
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </Outlet>
  );
}
