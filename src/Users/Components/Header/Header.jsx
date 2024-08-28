import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { FaTimes, FaBars } from "react-icons/fa";
import logogen from "../../../assets/images/logogen.png";
import { MdOutlineMail, MdOutlinePhoneCallback } from "react-icons/md";
import { RiFacebookCircleLine } from "react-icons/ri";
import { PiTiktokLogoThin } from "react-icons/pi";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import throttle from "lodash.throttle";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavbar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    if (location.pathname === "/") {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    sectionsRef.current = sections;

    const handleScroll = throttle(() => {
      let currentSection = activeSection;

      sectionsRef.current.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  const handleNavClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    setNavbar(false);
  };

  const Navbar = [
    { id: "home", name: "Home", link: "/" },
    { id: "services", name: "Services", link: "/services" },
    { id: "project", name: "Our Projects", link: "/projects" },
    { id: "about", name: "About", link: "/about" },
    { id: "contact", name: "Contact", link: "/contact" },
  ];

  return (
    <div>
      <nav className="fixed w-full top-0 left-0 shadow-md z-50">
        {!navbar && (
          <div className="w-full bg-black flex flex-wrap justify-around items-center lg:px-24 md:px-16 sm:px-14 px-12 py-2">
            <div className="flex items-center justify-center w-full md:w-auto mb-2 md:mb-0">
              <MdOutlineMail className="text-white" />
              <span className="text-white ml-2">info@gennex.com</span>
              <span className="text-white mx-4">|</span>
              <MdOutlinePhoneCallback className="text-white" />
              <span className="text-white ml-2">+856-20 76460195</span>
            </div>

            <div className="flex items-center justify-center w-full md:w-auto">
              <a
                href="https://www.facebook.com/Lsservice1234?mibextid=qi2Omg&rdid=XKpypUslYQjlSALD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FB4Vru8evYRNE75Dq%2F%3Fmibextid%3Dqi2Omg"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <RiFacebookCircleLine className="text-white" />
              </a>
              <span className="text-white mx-4">|</span>
              <a>
                <PiTiktokLogoThin className="text-white" />
              </a>
              <span className="text-white mx-4">|</span>
              <a
                href="https://www.linkedin.com/in/gennex-solutions-0167b3315/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <IoLogoInstagram className="text-white" />
              </a>
              <span className="text-white mx-4">|</span>
              <a
                href="https://x.com/GennexSolu74014"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
              >
                <FaXTwitter className="text-white" />
              </a>
            </div>
          </div>
        )}

        <div className="mx-auto flex justify-between items-center h-[12vh] w-full bg-[#006897] lg:px-24 md:px-16 sm:px-14 px-12 py-2">
          <RouterLink to="/" className="flex-shrink-0">
            <img src={logogen} alt="Logo" className="w-[15rem] h-auto" />
          </RouterLink>

          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none border border-transparent focus:border-gray-400"
              onClick={() => setNavbar(!navbar)}
              aria-label="Toggle navigation"
            >
              {navbar ? (
                <FaTimes className="text-white cursor-pointer" size={24} />
              ) : (
                <FaBars className="text-white cursor-pointer" size={24} />
              )}
            </button>
          </div>

          <div
            className={`absolute top-0 right-0 w-full md:w-auto bg-[#006897] md:bg-transparent md:static md:flex items-center transition-transform duration-300 transform ${navbar ? "translate-x-0" : "translate-x-full"
              } md:translate-x-0 z-40 md:z-auto`}
          >
            <ul className="list-none flex flex-col md:flex-row md:items-center md:gap-x-5 gap-y-4 md:gap-y-0 p-8 md:p-0">
              {Navbar.map((item, index) => (
                <li key={index}>
                  <Link
                    activeClass="underline"
                    onClick={() => handleNavClick(item.id)}
                    to={item.id}
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-70}
                    className={`text-white text-[1.15rem] font-medium tracking-wider hover:text-gray-200 ease-out duration-300 hover:underline underline-offset-4 m-2 hover:scale-105 transition-transform cursor-pointer ${activeSection === item.id ? "underline text-gray-200" : ""
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
