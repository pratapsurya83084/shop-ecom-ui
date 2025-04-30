import React from 'react';
import Outlet from '../Outlet';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Star } from "lucide-react";
// Your brands array
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

const BestSellingSinglepage = () => {
    const { id } = useParams();
    
//   console.log(parseInt(id));

  const newArray = bestSellingProducts.filter(pid => pid.id === Number(id));
console.log(newArray);

  
  return (
    <Outlet>
      <div className="p-6 max-w-6xl mx-auto grid gap-12">
        {newArray.map((product) => (
          <div key={product.id} className="md:flex justify-content-center items-center gap-8">
            {/* Product Image */}
            <div className="p-5 rounded-xl flex justify-content-center items-center overflow-hidden shadow-lg">
              <img src={product.image} alt={product.brand} className="w- h-80 md:h-80" />
            </div>
       
              
           

            {/* Product Details */}
            <div className="flex flex-col justify-center">
            <h2 className='text-xl font-bold mt-10 md:mt-0'>{product.name}</h2>
             
              <p className="text-2xl text-red-600 font-semibold mb-6">{product.offer}</p>
              <p className="text-gray-600 mb-6">
                This product is made with high-quality materials and offers you the best comfort and style.
              </p>

             <div>
              <h1 className='text-'>  {product.price}</h1>
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

export default BestSellingSinglepage;
