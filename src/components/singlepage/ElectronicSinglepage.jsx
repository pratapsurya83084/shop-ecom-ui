import React from "react";
import Outlet from "../Outlet";
import { useParams } from "react-router-dom";
// Your brands array
const brands = [
  {
    id: 1,
    image:
      "https://static.digit.in/product/29f79e7eeacbb8e1ba68d3532fea60a387104965.jpeg?tr=w-1200",
    brand: "DKNY",
    offer: "MIN. 20% OFF",
  },
  {
    id: 2,
    image:
      "https://media.extra.com/s/aurora/100315775_800/Apple-iPhone-14-Pro-Max%2C-5G%2C-128GB%2C-Space-Black?locale=en-GB,en-*,*",
    brand: "Just Cavalli",
    offer: "MIN. 20% OFF",
  },
  {
    id: 3,
    image:
      "https://th.bing.com/th/id/OIP._7Ve0ytx_5dLd8SLk7oFfAHaHa?rs=1&pid=ImgDetMain",
    brand: "GUESS",
    offer: "MIN. 30% OFF",
  },
  {
    id: 4,
    image:
      "https://microless.com/cdn/products/f026b0f0fb6302d095eda73e25215408-hi.jpg",
    brand: "Polo Ralph Lauren",
    offer: "FLAT 40% OFF",
  },
  {
    id: 5,
    image:
      "https://th.bing.com/th/id/OIP.v9eYR7b8CzrxU0LHPz6HmQHaHa?rs=1&pid=ImgDetMain",
    brand: "Fred Perry",
    offer: "UP TO 40% OFF",
  },
  {
    id: 6,
    image:
      "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/0e92d77e-8328-47ab-ac0c-9eae5cd8e3e1.jpg",
    brand: "The Collective",
    offer: "FLAT 40% OFF",
  },
];

const ElectronicSinglepage = () => {
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
                className="w-52 h-80 "
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">{product.brand}</h1>
              <p className="text-2xl text-indigo-600 font-semibold mb-6">
                {product.offer}
              </p>
              <p className="text-gray-600 mb-6">
                This product is made with high-quality materials and offers you
                the best comfort and style.
              </p>

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
              <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Outlet>
  );
};

export default ElectronicSinglepage;
