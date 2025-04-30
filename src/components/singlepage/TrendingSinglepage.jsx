import React from 'react';
import Outlet from '../Outlet';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Star } from "lucide-react";
// Your brands array
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

const TrendingSinglepage = () => {
    const { id } = useParams();
    
//   console.log(parseInt(id));

  const newArray = trendingProducts.filter(pid => pid.id === Number(id));
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

export default TrendingSinglepage;
