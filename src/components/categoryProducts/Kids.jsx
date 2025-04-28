import Outlet from '../Outlet';
import React from "react";
import { Link } from 'react-router-dom';
const brands = [
  {
    id: 1,
    image: "https://th.bing.com/th/id/OIP.OGistRyCyhYFRcPwoNfWvQHaHa?rs=1&pid=ImgDetMain",
    brand: "DKNY",
    offer: "MIN. 20% OFF",
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/312z2YKyQEL.jpg",
    brand: "Just Cavalli",
    offer: "MIN. 20% OFF",
  },
  {
    id: 3,
    image: "https://aasourcingltd.com/wp-content/uploads/2020/08/1-107.jpg",
    brand: "GUESS",
    offer: "MIN. 30% OFF",
  },
  {
    id: 4,
    image: "https://th.bing.com/th/id/OIP.4DGzChtBIqncRrEHbHFiqQHaHa?rs=1&pid=ImgDetMain",
    brand: "Polo Ralph Lauren",
    offer: "FLAT 40% OFF",
  },
  {
    id: 5,
    image: "https://th.bing.com/th/id/OIP.IhjpHLumxqiaNYjvp5d1OwHaKl?rs=1&pid=ImgDetMain",
    brand: "Fred Perry",
    offer: "UP TO 40% OFF",
  },
  {
    id: 6,
    image: "https://www.swagshirts99.com/wp-content/uploads/2021/12/King-Kong-Kids-T-Shirt.jpg",
    brand: "The Collective",
    offer: "FLAT 40% OFF",
  },
];

export default function ProductPage() {
  return (
    <Outlet>
      <div className="px-4 md:px-6 py-6">
      <h3 className='p-2 text-md md:text-3xl font-bold md:p-4'> "Explore Trendy Kids' Fashion" </h3>

        {/* GRID layout for two rows */}
        <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6   gap-6">
          {brands.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
           <Link to={`/singlepage/${item.id}`}>
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
