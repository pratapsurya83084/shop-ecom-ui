import Outlet from '../Outlet';
import React from "react";
import { Link } from 'react-router-dom';

const brands = [
  {
    id: 1,
    image: "https://i5.walmartimages.com/asr/c33bb859-28b0-48cb-a10c-f875059fd86a_1.d6d7413a3f0147ff6abfebc0a824b8ac.jpeg",
    brand: "DKNY",
    offer: "MIN. 20% OFF",
  },
  {
    id: 2,
    image: "https://img.ltwebstatic.com/images3_pi/2023/11/27/e1/17010663920250ac3b9a2f8de469937d15cfe503dd_thumbnail_900x.webp",
    brand: "Just Cavalli",
    offer: "MIN. 20% OFF",
  },
  {
    id: 3,
    image: "https://img.kwcdn.com/product/1dec4a0c30/8c4a729e-ea1f-4ca3-881e-d61eff8ca570_1339x1785.jpeg?imageView2/2/w/500/q/70/format/webp",
    brand: "GUESS",
    offer: "MIN. 30% OFF",
  },
  {
    id: 4,
    image: "https://i5.walmartimages.com/seo/Mens-Formal-Shirts-Long-Sleeve-Irregular-Button-Up-Dress-Shirt-Regular-Fit-Casual-Fashion-Solid-Color-Shirt-Tops_d415df83-2c8f-4418-9c91-afff5e3be7b7.7f3a53c0280bbc8a389dca3a9c69f75e.jpeg",
    brand: "Polo Ralph Lauren",
    offer: "FLAT 40% OFF",
  },
  {
    id: 5,
    image: "https://www.brooktaverner.com/image_cache/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/s/este-white_-fabian-navy-check.jpg",
    brand: "Fred Perry",
    offer: "UP TO 40% OFF",
  },
  {
    id: 6,
    image: "https://th.bing.com/th/id/OIP.aHaPWNhatkg_ssHZpBfdiwHaLH?rs=1&pid=ImgDetMain",
    brand: "The Collective",
    offer: "FLAT 40% OFF",
  },
];

export default function Mens() {
  return (
    <Outlet>
      <div className="px-4 md:px-6 py-6">
      <h3 className='p-2 text-md md:text-3xl font-bold md:p-4'> 
        "Explore Trendy Mens' Fashion"
         </h3>

        {/* GRID layout for two rows */}
        <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6   gap-6">
          {brands.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
           <Link to={`/MenSinglepage/${item.id}`}>
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
