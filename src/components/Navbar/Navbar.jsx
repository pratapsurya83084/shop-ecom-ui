// import React from "react";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import React, { useState, useEffect, Fragment, useContext, memo } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { list, parse } from "postcss";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import AdminLogin from "../admin/AdminLogin";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import ContextProvider from "../context/ContextProvider";

const Navbar = ({ handleOrderPopup }) => {
  const [showModal, setShowModal] = useState(false);
  const { GetUserCart, cart } = useContext(ContextProvider);

  // console.log("cart length :",cart );

  // console.log("get cart :",cart == null || cart.length == 0 ? "0" : cart.length);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const SearchProd = (e) => {
    e.preventDefault();
    console.log(search);
  };

  const adminCookie = Cookies.get("adminToken");
  // console.log(adminCookie ? "ff" : "no");

  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("googleAuth"));
    // console.log(users);
    setUser(users);
  }, []);

  //logout
  const googlehandleSignOut = async () => {
    try {
      const logoutUser = await axios.post(
        "http://localhost:1000/api/user/googleLogout",
        {},
        { withCredentials: true }
      );

      console.log("logout googleAuth :", logoutUser.data);

      if (logoutUser.data.success == true) {
        toast.success(logoutUser.data.message);
        localStorage.removeItem("googleAuth");
        navigate("/login");
      } else {
        toast.success("logout failed");
      }
    } catch (error) {
      console.log("failed logout : ", error);
    }

    // window.location.reload(); // or navigate to login page
  };

  const Formtoken = Cookies.get("AuthToken");
  // || Cookies.get("googleAuthToken");
  const googlAuthToken = Cookies.get("googleAuthToken");
  // console.log(googlAuthToken);

  // console.log(token);

  //formLogout
  const FormhandleSignOut = async () => {
    try {
      const logoutUser = await axios.post(
        "http://localhost:1000/api/user/formLogout",
        {},
        { withCredentials: true }
      );

      console.log(" logout formlogin :", logoutUser.data);
      if (logoutUser.data.status == true) {
        toast.success(logoutUser.data.message);

        navigate("/login");
        localStorage.removeItem("formloginData");
      } else {
        toast.error("logout failed");
      }
    } catch (error) {
      console.log("failed logout : ", error);
    } // or navigate to login page
  };

  return (
    <div className="shadow-md  dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <Toaster position="top-right" reverseOrder={false} />
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div className="flex">
            {/* add link  */}
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              Shopsy
            </Link>
            {!adminCookie ? (
              <div className="hidden md:flex ">
                <ul className=" pl-10  mt-3 ">
                  <li
                    className="list-none cursor-pointer "
                    onClick={() => setShowModal(true)}
                  >
                    adminLogin
                  </li>
                </ul>

                <AdminLogin
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                />
              </div>
            ) : (
              <div className="hidden md:flex ">
                <Link to="/dashboard">Dashboard</Link>
              </div>
            )}
          </div>

          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <form onSubmit={SearchProd}>
                <input
                  type="text"
                  placeholder="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
                />
              </form>

              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* order button   show cart if cartlen > 0 ,else " " */}
            <Link to="/cart">
              <button
                // onClick={() => handleOrderPopup()}
                className="flex bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full  items-center gap-3 group"
              >
                {/* {cart.length} */}
                {cart == null || cart.length == 0 ? "" : cart.length}
                <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button>
            </Link>

            {/* Darkmode Switch */}
            <div className="hidden lg:flex">
              <DarkMode />
            </div>
            {googlAuthToken ? (
              <div>
                <li className="group relative cursor-pointer list-none">
                  <img
                    src={
                      JSON.parse(localStorage.getItem("googleAuth"))?.picture
                    }
                    alt={JSON.parse(localStorage.getItem("googleAuth"))?.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #ccc",
                    }}
                  />

                  <div className="absolute z-[9999] hidden group-hover:block w-[100px] rounded-md bg-white p- right-1 text-black shadow-md">
                    <ul>
                      <li>
                        <button>
                          <Link
                            to="/profile"
                            className="inline-block w-full rounded-md p-2 "
                          >
                            Profile
                          </Link>
                        </button>
                      </li>
                      <li>
                        <button onClick={googlehandleSignOut}>
                          <Link
                            to="/login"
                            className="inline-block w-full rounded-md p-2 "
                          >
                            Sign Out
                          </Link>
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </div>
            ) : //  {Formtoken?():()}
            //if not googlelogin but formlogin then show logout option
            Formtoken ? (
              <div>
                <li className="group relative cursor-pointer list-none">
                  <img
                    src=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #ccc",
                    }}
                  />

                  <div className="absolute z-[9999] hidden group-hover:block w-[100px] rounded-md bg-white p- right-1 text-black shadow-md">
                    <ul>
                      <li>
                        <button>
                          <Link
                            to="/profile"
                            className="inline-block w-full rounded-md p-2  "
                          >
                            Profile
                          </Link>
                        </button>
                      </li>

                      <li>
                        <button onClick={FormhandleSignOut}>
                          <Link
                            to="/login"
                            className="inline-block w-full rounded-md p-2  "
                          >
                            Sign Out
                          </Link>
                        </button>
                      </li>

                      {/* ))} */}
                    </ul>
                  </div>
                </li>
              </div>
            ) : (
              //if not formlogin and googleLogin then show Login button
              <div>
                <Link
                  to="/login"
                  className="bg-orange-400 px-2 p-1 md:px-4 md:py-2 text-md font- text-white rounded-md"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* lower Navbar */}
      <div className="hidden md:flex justify-center">
        <ul className="sm:flex hidden items-center md:gap-4">
          {/* {Menu.map((data) => ( */}
          <li>
            <Link
              to="/kids"
              className="inline-block px-4 hover:text-primary duration-200"
            >
              Kids wear
            </Link>
          </li>
          <li>
            <Link
              to="/mens"
              className="inline-block px-4 hover:text-primary duration-200"
            >
              mens
            </Link>
          </li>
          <li>
            <Link
              to="/electronics"
              className="inline-block px-4 hover:text-primary duration-200"
            >
              electronics
            </Link>
          </li>
          <li>
            <Link
              to="/women"
              className="inline-block px-4 hover:text-primary duration-200"
            >
              Womens
            </Link>
          </li>

          {/* Simple Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <div className="flex items-center gap-[2px] py-2">
              Trending Products
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </div>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {/* {DropdownLinks.map((data) => ( */}
                <li>
                  <Link
                    to="/trending"
                    className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                  >
                    Trending Products
                  </Link>
                </li>

                <li>
                  <Link
                    to="/best-selling"
                    className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                  >
                    Best Selling
                  </Link>
                </li>
                <li>
                  <Link
                    to="/top-rated"
                    className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                  >
                    Top Rated
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* phone size navabr */}

      <div>
        <div className=" flex items-center">
          <button
            type="button"
            className="rounded-md bg-white p-2 m-2 text-gray-400 md:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* new navbar  phoneSize*/}
      <div className="   sticky top-0 z-50">
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto dark:bg-black bg-white dark:text-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-10">
                    <button
                      type="button"
                      className=" inline-flex items-center justify-center rounded-md p-2 dark:border  border border-gray-500 -m-2 mb-1"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <RxCross2 />
                    </button>
                  </div>

                  {/* <div className="ml-auto flex items-center"></div> */}

                  <div className="border-t  border-gray-200 px-4 py-3">
                    {/* list tabs in mobile desktop */}
                    <div className="px-5  grid grid-cols-1 lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      {/* <Link
                        to={"/allproducts"}
                        className="text-sm my-2 font-medium text-gray-700 "
                      >
                        All Products
                      </Link> */}

                      <Link
                        to={"/kids"}
                        className="text-sm my-2 font-medium  "
                      >
                        Kids Wear
                      </Link>

                      <Link
                        to="/mens"
                        className=" text-sm my-2 font-medium  cursor-pointer"
                      >
                        Men's
                      </Link>
                      <Link
                        to="/electronics"
                        className=" text-sm my-2 font-medium  cursor-pointer"
                      >
                        Electronics
                      </Link>
                      <Link
                        to="/women"
                        className=" text-sm my-2 font-medium  cursor-pointer"
                      >
                        Women's
                      </Link>

                      {!adminCookie ? (
                        <div>
                          <ul className=" p- ">
                            <li
                              className="list-none cursor-pointer underline"
                              onClick={() => setShowModal(true)}
                            >
                              adminLogin
                            </li>
                          </ul>

                          <AdminLogin
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                          />
                        </div>
                      ) : (
                        <Link to="/dashboard">Dashboard</Link>
                      )}

                      <div className="group relative cursor-pointer">
                        <div className="flex items-center gap-[2px] py-2">
                          Trending Products
                          <span>
                            <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                          </span>
                        </div>
                        <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md  p-2 dark:border shadow-md">
                          <ul>
                            {/* {DropdownLinks.map((data) => ( */}
                            <li>
                              <Link
                                to="/trending"
                                className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                              >
                                Trending Products
                              </Link>
                            </li>

                            <li>
                              <Link
                                to="/best-selling"
                                className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                              >
                                Best Selling
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/top-rated"
                                className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                              >
                                Top Rated
                              </Link>
                            </li>
                            {/* ))} */}
                          </ul>
                        </div>
                      </div>
                      <div className="lg:hidden flex">
                        <DarkMode />
                      </div>
                      {/* Cart symbol in mobile size menu*/}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

export default memo(Navbar);
