import React from "react";
import Outlet from '../Outlet';

import { Link } from 'react-router-dom';

const topRated = [
  {
    id: 33,
    name: "Noise Cancelling Headphones",
    image: "https://th.bing.com/th/id/OIP.w9Y1SbsjyiVHZxsSkoLzNQHaMU?rs=1&pid=ImgDetMain",
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
    image: "https://th.bing.com/th/id/OIP.HLsHKOuhAz3lAxhk2FPrOwHaHa?rs=1&pid=ImgDetMain",
    price: "₹499",
    rating: 4.7,
  },

  {
    id: 36,
    name: "Laptop apple",
    image: "https://microless.com/cdn/products/44161b03532a6fdf5e8b9b50a52f56c9-hi.jpg",
    price: "₹129990",
    rating: 4.7,
  },

  {
    id: 37,
    name: "iphone 15 pro max",
    image:"https://esim-compatible-phones.com/wp-content/uploads/2024/06/iPhone-15-Pro-Max.jpg",
    price: "₹150000",
    rating: 4.9,
  },
  
  {
    id: 38,
    name: "Long sleeve t-shirt",
    image:"https://i5.walmartimages.com/asr/3655bc7b-48e5-453c-a494-f1ddabeb7f92_1.9838d30a904832448a4d13b9d3edd737.jpeg",
    price: "₹150000",
    rating: 4.9,
  },
];

export default function Electronics() {
  return (
    <Outlet>
      <div className="px-4 md:px-6 py-6">
      <h3 className='p-2 text-md md:text-3xl font-bold md:p-4'> 
        "Explore Top Rated Products "
         </h3>

        {/* GRID layout for two rows */}
        <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6   gap-6">
          {topRated.map((item,i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
           <Link to={`/toprated-Singlepage/${item.id}`}>
           <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h- md:h-60 object-cove hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div></Link>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-pink-600 font-semibold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Outlet>
  );
}
