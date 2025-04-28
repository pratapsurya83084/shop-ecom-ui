import React from "react";
import Outlet from "../Outlet";
import { useParams } from "react-router-dom";
// Your brands array
const brands = [
  {
    id: 1,
    image:
      "https://i5.walmartimages.com/asr/c33bb859-28b0-48cb-a10c-f875059fd86a_1.d6d7413a3f0147ff6abfebc0a824b8ac.jpeg",
    brand: "DKNY",
    offer: "MIN. 20% OFF",
  },
  {
    id: 2,
    image:
      "https://img.ltwebstatic.com/images3_pi/2023/11/27/e1/17010663920250ac3b9a2f8de469937d15cfe503dd_thumbnail_900x.webp",
    brand: "Just Cavalli",
    offer: "MIN. 20% OFF",
  },
  {
    id: 3,
    image:
      "https://img.kwcdn.com/product/1dec4a0c30/8c4a729e-ea1f-4ca3-881e-d61eff8ca570_1339x1785.jpeg?imageView2/2/w/500/q/70/format/webp",
    brand: "GUESS",
    offer: "MIN. 30% OFF",
  },
  {
    id: 4,
    image:
      "https://i5.walmartimages.com/seo/Mens-Formal-Shirts-Long-Sleeve-Irregular-Button-Up-Dress-Shirt-Regular-Fit-Casual-Fashion-Solid-Color-Shirt-Tops_d415df83-2c8f-4418-9c91-afff5e3be7b7.7f3a53c0280bbc8a389dca3a9c69f75e.jpeg",
    brand: "Polo Ralph Lauren",
    offer: "FLAT 40% OFF",
  },
  {
    id: 5,
    image:
      "https://www.brooktaverner.com/image_cache/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/s/este-white_-fabian-navy-check.jpg",
    brand: "Fred Perry",
    offer: "UP TO 40% OFF",
  },
  {
    id: 6,
    image:
      "https://th.bing.com/th/id/OIP.aHaPWNhatkg_ssHZpBfdiwHaLH?rs=1&pid=ImgDetMain",
    brand: "The Collective",
    offer: "FLAT 40% OFF",
  },
];

const MenSinglepage = () => {
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
                className="w-52 h-80 object-cover"
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

export default MenSinglepage;
