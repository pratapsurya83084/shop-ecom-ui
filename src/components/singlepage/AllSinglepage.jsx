import React, { useContext } from "react";
import Outlet from "../Outlet";
import { useParams } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
// import ContextProvider from "../context/ContextProvider";
import ContextProvider from "../context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// Your brands array


const AllSinglepage = () => {
  const { products, addToCart } = useContext(ContextProvider);
  const { id } = useParams();

  //get all cookies 3
   const token = Cookies.get("AuthToken") || Cookies.get("googleAuthToken") ||Cookies.get("adminToken");
// console.log(token);
 

const newArray = products?.filter((pid)=>pid._id === id)
  // products?.filter((pid) => pid._id == Number(id));
  console.log(newArray);
  // console.log(products);

  //onlclick  buuton
   const navigate = useNavigate()
   const CartAddProducts= async(product_id,product_title, product_price, product_qty, product_imgsrc)=>{
//check if user is login then it possible to add cart else redirects to login page
if (token) {
  // console.log("yes token is exists :",token);
   let addproduct = await  addToCart(product_id,product_title, product_price, product_qty, product_imgsrc);
if (addproduct) {
  toast.success("product added cart")
    }
}else{
  toast.error("user not login ,please Login first")
  navigate('/login')
}
}
  return (
    <Outlet>
      <div className="dark:bg-gray-900   dark:text-white">

      
      <div className="p-6 max-w-6xl mx-auto grid gap-12">
        {newArray?.map((product) => (
          <div
            key={product._id}
            className="dark:bg-gray-800 rounded-md md:flex justify-content-center items-center gap-8"
          >
            {/* Product Image */}
            <div className="shadow-lg p-5 rounded-xl flex justify-content-center items-center overflow-hidden ">
              <img
                src={product.imgsrc}
                alt={product.brand}
                className="w- h-80 md:h-80 rounded-md"
              />
            </div>

            {/* Product Details */}
            <div className="p-3 flex flex-col justify-center">
              <h2 className="text-xl font-bold mt-10 md:mt-0">
                {product.title}
              </h2>

              <p className="text-2xl text-red-600 font-semibold mb-6">
                {product.offer}
              </p>
              <p className=" mb-6 p-">
                This product is made with high-quality materials and offers you
                the best comfort and style.
              </p>

              <div>
                <h1 className="text-"> {product.price}</h1>
              </div>

              <div className="flex items-center gap-1 text-yellow-500 text-xs">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={14}
                    fill={
                      index < Math.floor(product.rating) ? "#facc15" : "none"
                    }
                    strokeWidth={1}
                  />
                ))}
              </div>
              {/* Add to Cart */}
              <button 
               onClick={()=>CartAddProducts(product._id,product.title, product.price, product.qty, product.imgsrc)}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </Outlet>
  );
};

export default AllSinglepage;
