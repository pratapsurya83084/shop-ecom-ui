import Outlet from '../Outlet';
import React from "react";
import { Link } from 'react-router-dom';

const brands = [
  {
    id: 1,
    image: "https://static.digit.in/product/29f79e7eeacbb8e1ba68d3532fea60a387104965.jpeg?tr=w-1200",
    brand: "DKNY",
    offer: "MIN. 20% OFF",
  },
  {
    id: 2,
    image: "https://media.extra.com/s/aurora/100315775_800/Apple-iPhone-14-Pro-Max%2C-5G%2C-128GB%2C-Space-Black?locale=en-GB,en-*,*",
    brand: "Just Cavalli",
    offer: "MIN. 20% OFF",
  },
  {
    id: 3,
    image: "https://th.bing.com/th/id/OIP._7Ve0ytx_5dLd8SLk7oFfAHaHa?rs=1&pid=ImgDetMain",
    brand: "GUESS",
    offer: "MIN. 30% OFF",
  },
  {
    id: 4,
    image: "https://microless.com/cdn/products/f026b0f0fb6302d095eda73e25215408-hi.jpg",
    brand: "Polo Ralph Lauren",
    offer: "FLAT 40% OFF",
  },
  {
    id: 5,
    image: "https://th.bing.com/th/id/OIP.v9eYR7b8CzrxU0LHPz6HmQHaHa?rs=1&pid=ImgDetMain",
    brand: "Fred Perry",
    offer: "UP TO 40% OFF",
  },
  {
    id: 6,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/0e92d77e-8328-47ab-ac0c-9eae5cd8e3e1.jpg",
    brand: "The Collective",
    offer: "FLAT 40% OFF",
  },
];

export default function Electronics() {
  return (
    <Outlet>
      <div className="px-4 md:px-6 py-6">
      <h3 className='p-2 text-md md:text-3xl font-bold md:p-4'> 
        "Explore Trendy Electronics "
         </h3>

        {/* GRID layout for two rows */}
        <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6   gap-6">
          {brands.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
           <Link to={`/electronicSinglepage/${item.id}`}>
           <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.brand}
                  className="w-full h- md:h-60 object-cove hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div></Link>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold">{item.brand}</h3>
                <p className="text-pink-600 font-semibold">{item.offer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Outlet>
  );
}
