import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import logogen from '../../../assets/images/logogen.png';

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  // Primary Navbar items
  const Navbar = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "Contact", link: "/contact" },
  ];

  // Secondary Navbar items
  const SecondaryNavbar = [
    { name: "Blog", link: "/blog" },
    { name: "Careers", link: "/careers" },
    { name: "FAQ", link: "/faq" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#006897] lg:px-24 md:px-16 sm:px-14 px-12 py-2 shadow-md z-50">
        <div className="mx-auto flex justify-between items-center h-[12vh]">
          {/* Logo section */}
          <Link to="/" className="flex-shrink-0">
            <img src={logogen} alt="Logo" className="w-[15rem] h-auto" />
          </Link>

          {/* Toggle button section */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none border border-transparent focus:border-gray-400 focus:border"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <FaTimes
                  className="text-white cursor-pointer"
                  size={24}
                />
              ) : (
                <FaBars
                  className="text-white cursor-pointer"
                  size={24}
                />
              )}
            </button>
          </div>

          {/* Primary Navbar menu items section */}
          <div
            className={`md:flex ${navbar ? "block" : "hidden"} flex-grow justify-end md:items-center`}
          >
            <ul className="list-none flex gap-x-5 md:flex-row flex-col md:items-center">
              {Navbar.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-white text-[1.15rem] font-medium tracking-wider hover:text-gray-200 ease-out duration-300 hover:underline underline-offset-4 first-line: m-2"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Secondary Navbar menu items section */}
  
      </nav>
    </>
  );
};

export default Header;
