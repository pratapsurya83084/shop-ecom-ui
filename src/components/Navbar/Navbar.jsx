// import React from "react";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import React, { useState } from 'react';

import {Link} from 'react-router-dom'

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
  const [isOpen, setIsOpen] = useState(false);


const showHamburger=()=>{
  setIsOpen(!isOpen)
}

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          <div>
            {/* add link  */}
            <Link to="/"  className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              Shopsy
            </Link>
          </div>

          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800  "
              />
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
            <Link to="/login">
            <div>
              <button className="bg-orange-500 text-md rounded text-white font-bold px-1 sm:px-3 py-1">Login</button>
            </div>
            </Link>
           
          </div>
        </div>
      </div>
  

      {/* lower Navbar */}
      <div data-aos="zoom-in" className="hidden md:flex justify-center">
        <ul className="sm:flex hidden items-center md:gap-4">
          {/* {Menu.map((data) => ( */}
            <li>
              <Link  to="/kids"
                className="inline-block px-4 hover:text-primary duration-200"
              >
               Kids wear
              </Link>
            </li>
            <li>
              <Link  to="/mens"
                className="inline-block px-4 hover:text-primary duration-200"
              >
               mens
              </Link>
            </li>
            <li>
              <Link  to="/electronics"
                className="inline-block px-4 hover:text-primary duration-200"
              >
             electronics
              </Link>
            </li>
            <li>
              <Link  to="/women"
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
                    <Link to="/trending"
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                     Trending Products
                    </Link>
                  </li>

                  <li>
                    <Link to="/best-selling"
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                  Best Selling
                    </Link>
                  </li>
                  <li>
                    <Link to="/top-rated"
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

      {isOpen  &&
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
      </div>      }
      </div>
  );
};

export default Navbar;
