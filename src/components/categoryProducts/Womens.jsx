import Outlet from "../Outlet";
import React from "react";
import { Link } from "react-router-dom";

const brands = [
  {
    id: 20,
    image:
      "https://m.media-amazon.com/images/I/6143d3r6D0L._AC_UL480_FMwebp_QL65_.jpg",
    brand: "DKNY",
    offer: "MIN. 20% OFF",
  },
  {
    id: 21,
    image:
      "https://m.media-amazon.com/images/I/81DRk+I9w4L._AC_UL480_FMwebp_QL65_.jpg",
    brand: "Just Cavalli",
    offer: "MIN. 20% OFF",
  },
  {
    id: 23,
    image:
      "https://m.media-amazon.com/images/I/513zpgXL98L._AC_UL480_FMwebp_QL65_.jpg",
    brand: "GUESS",
    offer: "MIN. 30% OFF",
  },
  {
    id: 24,
    image:
      "https://m.media-amazon.com/images/I/714nEfpvyqL._AC_UL480_FMwebp_QL65_.jpg",
    brand: "Polo Ralph Lauren",
    offer: "FLAT 40% OFF",
  },
  {
    id: 25,
    image:
      "https://m.media-amazon.com/images/I/51RmqXyesGL._AC_UL480_FMwebp_QL65_.jpg",
    brand: "Fred Perry",
    offer: "UP TO 40% OFF",
  },
  {
    id: 26,
    image:
      "https://m.media-amazon.com/images/I/71GxB8DJLyL._AC_UL480_FMwebp_QL65_.jpg",
    brand: "The Collective",
    offer: "FLAT 40% OFF",
  },
];

export default function Womens() {
  return (
    <Outlet>
      <div className="px-4 md:px-6 py-6">
        <h3 className="p-2 text-md md:text-3xl font-bold md:p-4">
          "Explore Trendy Womens "
        </h3>

        {/* GRID layout for two rows */}
        <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6   gap-6">
          {brands.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
            >
              <Link to={`/womenSinglepage/${item.id}`}>
                <div className="overflow-hidden flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.brand}
                    className="w- h-40 md:h-52   hover:scale-110 transition-transform duration-300 ease-in-out"
                  />
                </div>
              </Link>
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
