// import React from "react";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { list, parse } from "postcss";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import AdminLogin from "../admin/AdminLogin";

const Menu = [
  {
    id: 3,
    name: "Kids Wear",
    link: "/#",
  },
  {
    id: 3,
    name: "Mens Wear",
    link: "/#",
  },
  {
    id: 3,
    name: "Electronics",
    link: "/#",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showModal, setShowModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const SearchProd = (e) => {
    e.preventDefault();
    console.log(search);
  };

  const adminCookie = Cookies.get("adminToken");
  // console.log(adminCookie);

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

  const showHamburger = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
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

            {/* admin name */}
            {adminCookie ? (
              <div className="px-2 mt-2">
                {" "}
                <Link to="/dashboard">Dashboard </Link>
              </div>
            ) : (
              <div>
                <ul className="hidden md:flex p-2 md:ml-40">
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

            {/* order button */}
            <button
              onClick={() => handleOrderPopup()}
              className="hidden md:flex  bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full  items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>

            {/* Darkmode Switch */}
            <div>
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
                      {/* {DropdownLinks.map((data) => ( */}
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

                      {/* ))} */}
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
                      {/* {DropdownLinks.map((data) => ( */}
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
                  className="bg-orange-400 px-2 py-1 md:px-4 md:py-2 text-md font-bold text-white rounded-md"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* lower Navbar */}
      <div data-aos="zoom-in" className="hidden md:flex justify-center">
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
          {/* ))} */}
          {/* Simple Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2">
              Trending Products
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
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
                {/* ))} */}
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* phone size navabr */}
      <div data-aos="zoom-in" className="flex md:hidden justify-end">
        <button onClick={showHamburger}>menu hamburger</button>
      </div>

      {isOpen && (
        <div>
          <div className="absolute top-0 left-0 w-[200px] text-center  bg-gray-200 text-black min-h-screen  p-">
            <ul className="text-xl  py-10">
              {Menu.map((data) => (
                <li key={data.id}>
                  <a
                    href={data.link}
                    className="inline-block px-4 hover:text-primary duration-200"
                  >
                    {data.name}
                  </a>
                </li>
              ))}
              {/* Simple Dropdown and Links */}
              <li className="group relative cursor-pointer">
                <a href="#" className="flex items-center gap-[2px] py-2">
                  Trending Products
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </a>
                <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                  <ul>
                    {DropdownLinks.map((data) => (
                      <li key={data.id}>
                        <a
                          href={data.link}
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                        >
                          {data.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
