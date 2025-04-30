import React from 'react';
import Outlet from '../Outlet';
import { useParams } from 'react-router-dom';
// Your brands array
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

const SingleProduct = () => {
    const { id } = useParams();
    
//   console.log(parseInt(id));

  const newArray = brands.filter(pid => pid.id === Number(id));
console.log(newArray);

  
  return (
    <Outlet>
      <div className="p-6 max-w-6xl mx-auto grid gap-12">
        {newArray.map((product) => (
          <div key={product.id} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={product.image} alt={product.brand} className="w-full h- object-cover" />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">{product.brand}</h1>
              <p className="text-2xl text-red-600 font-semibold mb-6">{product.offer}</p>
              <p className="text-gray-600 mb-6">
                This product is made with high-quality materials and offers you the best comfort and style.
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

export default SingleProduct;
