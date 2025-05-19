import React, { useContext, useEffect, useReducer, useState } from "react";
import Outlet from "../Outlet";
import ContextProvider from "../context/ContextProvider";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import IfNotCartItem from "./IfNotCartItem";
import toast from "react-hot-toast";
import AdminLogin from "../admin/AdminLogin";
import ProceedToCheckoutForm from "../checkout/ProceedToCheckoutForm";


export default function Cart() {
  const { GetUserCart, IncreaseQty, DecreaseQty, RemmoveFromCart, updateCart } =
    useContext(ContextProvider);
  const [cartItem, setCartItem] = useState();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });
  // console.log((cartItem==null)||(cartItem.length==0)?"yes empty":"not empty"); //same condition use below html

  //remove cart onclick function
  const RemoveProductFromCart = async (pid) => {
    try {
      const prodRemove = await RemmoveFromCart(pid);
      // console.log("Product removed from cart successfully:", prodRemove);
      if (prodRemove.cart.items) {
        toast.success("successfully remove product from cart");
      } else {
        toast.error("failed remove cart item");
      }
      let afterRemovecart = await GetUserCart(); //get allitem after remove
      //  console.log("after remove cart is :",afterRemovecart);

      setCartItem(afterRemovecart.cart.items); //set updated cart
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  useEffect(() => {
    const fetCartProduct = async () => {
      const response = await GetUserCart();
      setCartItem(response.cart.items);
      // console.log("get user specific product cart:", response.cart.items);
    };
    fetCartProduct();
  }, []);

  async function Increaseqty(qty, pid) {
    if (!qty || !pid) return;

    // Optimistically update local UI
    setCartItem((prev) =>
      prev.map((item) =>
        item.productid === pid ? { ...item, qty: item.qty + 1 } : item
      )
    );

    // Sync with backend (can fail silently or handle error)
    try {
      await IncreaseQty(qty, pid);
    } catch (err) {
      console.error("Increase failed", err);
      // Optionally revert UI change or show error
    }
  }
  // Inspect the structure of the array

  async function Decreaseqty(qty, pid) {
    if (!qty || !pid) return;
    let a = await updateCart();
    // console.log("cart dec  with 0 len :",a);

    // Optimistic local update
    setCartItem((prev) =>
      prev.map((item) =>
        item.productid === pid ? { ...item, qty: item.qty - 1 } : item
      )
    );

    try {
      let decQty = await DecreaseQty(qty, pid);
      console.log("dec :", decQty.cart.items);

      // console.log(decQty.cart.items == null || decQty.cart.items.length == 0 ? "yes empty" : "not empty" );
      setCartItem(decQty.cart.items);
    } catch (err) {
      console.error("Decrease failed", err);
    }
  }
  const Formtoken = Cookies.get("AuthToken");
  const adminToken = Cookies.get("adminToken");
  // || Cookies.get("googleAuthToken");
  const googlAuthToken = Cookies.get("googleAuthToken");

  const token = Formtoken || googlAuthToken || adminToken;
  // console.log("tokn received:", token);

  // console.log(!token?"t":"f");

  const handleLoginRedirect = () => {
    navigate("/login");
  };
// console.log(cartItem);

// Calculate total price
const totalPrice = cartItem?.reduce((acc, item) => {
  return acc + item.price * item.qty;
}, 0);


console.log("Total Price:", totalPrice);
const platformFee = 20;
const totalPay = totalPrice + 10;
  return (
    <Outlet>
      <div className="dark:bg-black    dark:text-white">
        <div className=" min-h-screen p-4">
          <div
            className={`max-w-6xl mx-auto grid ${
              cartItem == null || cartItem?.length == 0
                ? "md:grid-cols-2"
                : "md:grid-cols-3"
            }  gap-6`}
          >
            {/* Left section - Items */}
            {!token ? (
              <div className="dark:bg-slate-900  shadow-lg rounded-lg p-4 md:p-10 flex flex-col items-center">
                <img
                  src="\tienda-online-kit-digital.png"
                  alt="Missing Cart Items"
                  className="w- mb-6"
                />
                <h2 className="text-lg font-semibold mb-2">
                  Missing Cart items?
                </h2>
                <p className=" mb-4">
                  Login to see the items you added previously
                </p>
                <button
                  onClick={handleLoginRedirect}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded"
                >
                  Login
                </button>
              </div>
            ) : //else
            cartItem == null || cartItem.length == 0 ? (
              <IfNotCartItem />
            ) : (
              <div className="md:col-span-2 space-y-4">
                {cartItem.map((item, index) => (
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

                        <div className="text-sm  mt-1">
                          ₹. {item.price}
                          <span className="text-green-600 font-semibold">
                            {item.offerPrice}
                          </span>{" "}
                          <div className="text-sm mt-1 ">
                            Delivery by {item.delivery} |{" "}
                            <span className="text-green-600">Free</span>
                          </div>
                        </div>

                        <div className="flex items-center mt-4 gap-4">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() =>
                                Decreaseqty(item.qty, item.productid)
                              }
                              className="px-2 py-1"
                            >
                              −
                            </button>
                            <span className="px-3">{item.qty}</span>
                            <button
                              onClick={() =>
                                Increaseqty(item.qty, item.productid)
                              }
                              className="px-2 py-1"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              RemoveProductFromCart(item.productid)
                            }
                            className="bg-orange-500 dark:text-  text-white px-2 py-1 rounded text-sm "
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Right section - Price Summary */}
            <div className="dark:bg-gray-900  shadow rounded p-4 h-fit">
              <h3 className="text-lg font-semibold mb-4">PRICE DETAILS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Price cartItems.length item</span>
                  <span>₹. {totalPrice}</span>
                </div>
               
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="text-green-600">₹. {platformFee}</span>
                </div>
               
                <hr />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total Amount</span>
                  <span>₹. {totalPay}</span>
                </div>
              
              </div>
              <div>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-6 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                >
                  Proceed to checkout
                </button>

                <ProceedToCheckoutForm
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Outlet>
  );
}
