import React, { useContext, useEffect, useReducer, useState } from "react";
import Outlet from "../Outlet";
import ContextProvider from "../context/ContextProvider";

const cartItems = [
  {
    id: 1,
    name: "BRUTON Lite Casual Shoes Sneakers For Men",
    image: "https://via.placeholder.com/80",
    size: "8, White",
    price: 899,
    offerPrice: 0,
    inStock: false,
  },
  {
    id: 2,
    name: "INTIMIFY Dark Spot Corrector Cream",
    image: "https://via.placeholder.com/80",
    price: 899,
    offerPrice: 188,
    quantity: 1,
    delivery: "Mon May 19",
    inStock: true,
  },
];

export default function Cart() {
  const { GetUserCart ,IncreaseQty ,DecreaseQty} = useContext(ContextProvider);
  const [cartItem, setCartItem] = useState();

  useEffect(() => {
    const fetCartProduct = async () => {
      const response = await GetUserCart();
      setCartItem(response.cart?.items);
      console.log("get user specific product cart:", response.cart?.items);
    };
    fetCartProduct();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.offerPrice && item.inStock
        ? item.offerPrice * (item.quantity || 1)
        : 0),
    0
  );

  const discount = 711;
  const platformFee = 3;
  const deliveryCharge = 0;
  const total = subtotal + platformFee + deliveryCharge;

//decreaser qty button
const Decreaseqty =async (qty ,pid) =>{
    if (!qty||!pid) {
        // alert("no id ,qtty")
        return;
    }
const decQty = await DecreaseQty(qty , pid);
console.log("Dec id:",decQty);

}
//increase qty button
const Increaseqty = async(qty ,pid) =>{
      if (!qty||!pid) {
        // alert("no id ,qtty")
        return;
    }
const incQty = await IncreaseQty(qty , pid);
    console.log("Inc id:",incQty);

}

          








  return (
    <Outlet>
      <div className="dark:bg-black    dark:text-white">
        <div className=" min-h-screen p-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Left section - Items */}
            <div className="md:col-span-2 space-y-4">
              {cartItem?.map((item, index) => (
                <div
                  key={index}
                  className=" dark:bg-gray-900 p-4 shadow rounded"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.imgsrc}
                      alt={item.title}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="text-md font-semibold">{item.title}</h2>

                      <p className="text-sm text-red-500 font-semibold mt-1">
                        {item.category}
                      </p>

                      
                        <div className="text-sm text-gray-700 mt-1">
                          ₹. {item.price}
                         
                          <span className="text-green-600 font-semibold">
                            {item.offerPrice}
                          </span>{" "}
                         
                          <div className="text-sm mt-1 text-gray-600">
                            Delivery by {item.delivery} |{" "}
                            <span className="text-green-600">Free</span>
                          </div>
                        </div>
                 
                      {/* Quantity + Actions */}

                      <div className="flex items-center mt-4 gap-4">
                        <div className="flex items-center border rounded">
                          <button   onClick={()=>Decreaseqty(item.qty,item.productid)} className="px-2 py-1">−</button>
                          <span className="px-3">{item.qty}</span>
                          <button    onClick={()=>Increaseqty(item.qty,item.productid)}  className="px-2 py-1">+</button>
                        </div>

                        <button className="text-blue-600 text-sm hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right section - Price Summary */}
            <div className="dark:bg-gray-900  shadow rounded p-4 h-fit">
              <h3 className="text-lg font-semibold mb-4">PRICE DETAILS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Price ({cartItems.length} item)</span>
                  <span>₹{cartItems[1].price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-600">− ₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 line-through">₹40</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
                <p className="text-green-600 text-sm mt-2">
                  You will save ₹{discount + 40} on this order
                </p>
              </div>
              <button className="mt-6 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </Outlet>
  );
}
