import Outlet from "../Outlet";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ContextProvider from "../context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
export default function BestSelling() {
  const { products, addToCart } = useContext(ContextProvider);
  // console.log(products);
    const newArr = products?.filter((prod) => prod.category == "bestselling");
      // console.log(newArr)
  const token = Cookies.get("AuthToken") || Cookies.get("googleAuthToken") ||Cookies.get("adminToken");
  
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
      <div className="  dark:bg-gray-900  dark:text-white">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="  p-4 max-w-6xl mx-auto">
          <h1 className="text-xl md:text-3xl font-bold mb-6 text-center">
       Best Selling Products
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {newArr?.map((product, index) => (
              <div
                key={product._id}
                className="dark:border rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform overflow-hidden"
              >
                <Link to={`/bestSelinglePage/${product._id}`}>
                  <div className="flex justify-center items-center p-2">
                    <img
                      src={product.imgsrc}
                      alt={product.title}
                      className="w-40 h-36 object- rounded-md"
                    />
                  </div>
                </Link>
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex justify-between text-sm font-medium">
                    <h2>{product.title}</h2>
                    <span className=" text-red-600 font-semibold">
                     ₹.{product.price}
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-1 text-yellow-500 text-xs">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={14}
                      fill={index < Math.floor(product.rating) ? "#facc15" : "none"}
                      strokeWidth={1}
                    />
                  ))}
                </div> */}
                  <button
                    onClick={() =>
                      CartAddProducts(
                        product._id,
                        product.title,
                        product.price,
                        product.qty,
                        product.imgsrc
                      )
                    }
                    className="mt-1 w-full flex items-center justify-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-sm py-1.5 rounded-md transition"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Outlet>
  );
}
