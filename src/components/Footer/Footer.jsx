import React from "react";
import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/website/footer-pattern.jpg";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const FooterLinks = [
  {
    title: "Kids Wear",
    link: "/kids",
  },
  {
    title: "Mens",
    link: "/mens",
  },
  {
    title: "electronics",
    link: "/electronics",
  },
  {
    title: "Womens",
    link: "/women",
  },
];



const Footer = () => {
  return (
    <div style={BannerImg} className="text-white">
      <div className="container">
        {/* data-aos="zoom-in"  */}
        <div className="grid md:grid-cols-3 pb-44 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="" className="max-w-[50px]" />
              Shopsy
            </h1>
            <p>
            "Shop with confidence and enjoy fast shipping, easy returns, and exceptional customer service."


            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link,i) => (
                    <Link to={`/${link.link}`}
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={i}
                    >
                      <span>{link.title}</span>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div>
             
            </div>

            {/* social links */}

            <div>
              <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>Maharastra, Pune</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+91 8308459145</p>
                </div>
                <p>developed by pratap</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
