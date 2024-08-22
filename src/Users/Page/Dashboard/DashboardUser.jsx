import { React, useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import imageHome from '../../../assets/images/imageHome.jpg';
import { FaLaptop, FaMobileAlt, FaLightbulb, FaWifi, FaClipboardCheck, FaShieldAlt, FaUserTie, FaGlobeAmericas } from 'react-icons/fa';
import Card from '../../Components/Card/CardService';
import Footer from '../../Components/Footer/Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imag from '../../../assets/images/sunmiv.png';
import gennex from '../../../assets/images/gennex01.png';
import axios from 'axios';
import { TbBrandFlutter } from "react-icons/tb";
import { IoLogoReact } from "react-icons/io5";
import { RiVuejsLine } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa6";
import { FaGolang } from "react-icons/fa6";
import { SiMysql } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandMongodb } from "react-icons/tb";
import { FiGitlab } from "react-icons/fi";
import { RiAngularjsLine } from "react-icons/ri";
import { TbBrandPython } from "react-icons/tb";
import { BiLogoJquery } from "react-icons/bi";
import { SiSvelte } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { FaJava } from "react-icons/fa6";
import { FaAws } from "react-icons/fa6";
import { SiGooglecloud } from "react-icons/si";
import { FaDigitalOcean } from "react-icons/fa6";
import { TbBrandFirebase } from "react-icons/tb";
import { DiMsqlServer } from "react-icons/di";
import { SiAmazondynamodb } from "react-icons/si";
import { DiRedis } from "react-icons/di";
import { FaJenkins } from "react-icons/fa";
import { SiCircleci } from "react-icons/si";
import { SiAzuredevops } from "react-icons/si";
import { TbBrandAnsible } from "react-icons/tb";
import { LiaDocker } from "react-icons/lia";
import { BiLogoKubernetes } from "react-icons/bi";
import { SiGrab } from "react-icons/si";
import { SiElasticsearch } from "react-icons/si";
import ai from '../../../assets/images/microchip.png'
import internetofthings from '../../../assets/images/internetofthings.png'
import blockchain from '../../../assets/images/blockchain.png'
import terraform from '../../../assets/images/terraform.png'
import { SiGrafana } from "react-icons/si";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";

import facebook from '../../../assets/images/Facebook.png'
import Vector from '../../../assets/images/Vector.png'
import Instagram from '../../../assets/images/Instagram.png'



function DashboardUser() {
  const timenow = new Date();
  const years = timenow.getFullYear();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dataHome, setDataHome] = useState([]);
  const [dataService, setDataService] = useState([])

  const getDataHome = async () => {
    try {
      const res = await axios.get('http://localhost:3000/home/getData');
      console.log("dataHome", res.data.data);
      setDataHome(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  }
  const getDataService = async () => {
    try {
      const res = await axios.get('http://localhost:3000/service/getData');
      console.log("dataService", res.data.data);
      setDataService(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataHome();
    getDataService();
  }, []);

  const NextArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={`${className} custom-next-arrow`}
        style={{ ...style, display: "block", background: "#005A8C", borderRadius: "70%", }}
        onClick={onClick}
      >

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </div>
    );
  };

  const PrevArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={`${className} custom-prev-arrow`}
        style={{

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#005A8C",
          borderRadius: "50%",
        }}
        onClick={onClick}
      >
      </div>

    );
  };



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: "slick-dots custom-dots",
    customPaging: i => (
      <div
        className={`w-4 h-4 rounded-full ${i === currentSlide ? 'bg-[#005A8C]' : 'bg-gray-400'}`} // Dynamic color based on index
      ></div>
    ),
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const data = [
    {
      name: `G-Parking`,
      img: imag,
      descript: 'Comfortable and easy to use Real-time report Cheap price Safe and modern Everything can be controlled.',
    },
    {
      name: `G-Parking`,
      img: imag,
      descript: 'Comfortable and easy to use Real-time report Cheap price Safe and modern Everything can be controlled.',
    },
    {
      name: `G-Parking`,
      img: imag,
      descript: 'Comfortable and easy to use Real-time report Cheap price Safe and modern Everything can be controlled.',
    },
    {
      name: `G-Parking`,
      img: imag,
      descript: 'Comfortable and easy to use Real-time report Cheap price Safe and modern Everything can be controlled.',
    },
    {
      name: `G-Parking`,
      img: imag,
      descript: 'Comfortable and easy to use Real-time report Cheap price Safe and modern Everything can be controlled.',
    },
    {
      name: `G-Parking`,
      img: imag,
      descript: 'Comfortable and easy to use Real-time report Cheap price Safe and modern Everything can be controlled.',
    },
  ];

  return (
    <>
      <Header className="sticky top-0 left-0 w-full shadow-md " />
      <div className="pt-[5.1rem] sm:pt-[6rem] md:pt-[5.7rem] lg:pt-10 xl:pt-[5.7rem]">
        {
          dataHome.map((item, index) => {
            return (
              <div key={index} className="relative w-full">

                <img src={`http://localhost:3000/images/${item.image}`} className="w-full h-full object-cover" />
                <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl">{item.description}</h1>
              </div>
            )
          })
        }

        <div className="flex flex-col items-center bg-white text-[#005A8C] text-3xl pt-10">
          <h1>What we do?</h1>
          <div className="flex items-center justify-center mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {dataService.map((service, index) => {
                const isLastRowWithTwoItems =
                  dataService.length % 3 === 2 && index >= dataService.length - 2;
                return (
                  <div
                    key={index}
                    className={`flex ${isLastRowWithTwoItems && index === dataService.length - 1 ? 'col-span-2' : ''}`}
                  >
                    <div className="hover:shadow-lg hover:scale-105 transition-transform duration-300">
                      <Card {...service} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


        </div>

      </div>
      {/* Projects */}
      <div className="w-full sm:w-3/4 m-auto p-4 sm:p-10 z-0">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
          <h1 className="text-[#005A8C] text-2xl sm:text-3xl">Our Projects</h1>
          <button className="text-[#005A8C] text-lg sm:text-xl font-bold">See All</button>
        </div>

        <div className="mt-10 sm:mt-20 mb-10 sm:mb-20">
          <Slider {...settings}>
            {data.map((item, index) => (
              <div
                key={index}
                className="h-auto w-full sm:w-auto bg-gradient-to-b to-[#005A8C] from-white text-black rounded-b-xl p-4 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <div className="flex flex-row h-[30vh] w-full sm:w-[40vw] border-2 border-white rounded-sm p-5 justify-around items-center">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-semibold text-[#005A8C]">{item.name}</h1>
                      <p className="text-white">Comfortable and easy to use</p>
                      <p className="text-white">Real-time report</p>
                      <p className="text-white">Cheap price</p>
                      <p className="text-white">Safe and modern</p>
                      <p className="text-white">Everything can be controlled</p>
                    </div>
                    <img
                      src={item.img}
                      alt=""
                      className="h-[20vh] w-[30vw] sm:w-[10vw]"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <h1 className="text-xl sm:text-2xl font-semibold text-[#005A8C] mb-2">{item.name}</h1>
                    <p className="text-white">{item.descript}</p>
                    <p className="text-white">{item.descript}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>


        <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
          <div className="p-4 max-w-4xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg">
            {/* Logo Section */}
            <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center items-center">
              <div className="bg-gray-200 rounded-lg p-4 w-full flex items-center justify-center">
                <img src={gennex} className="w-full h-auto max-w-xs md:max-w-full" />
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">About the Company</h2>
              <p className="mb-6 text-center md:text-left">
                Innovative Solutions is a cutting-edge technology company that provides innovative solutions for
                businesses of all sizes. Founded in 2022, we are dedicated to helping our clients achieve their goals
                through our customized and effective technology solutions. With over a decade of experience, we have
                built a reputation for delivering high-quality services to our clients.
              </p>

              {/* Stats Section */}
              <div className="flex flex-col md:flex-row justify-between text-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-3xl font-bold text-[#005A8C]">2024</p>
                  <p className="text-gray-600">Founded</p>
                </div>
                <div className="mb-4 md:mb-0">
                  <p className="text-3xl font-bold text-[#005A8C]">96+</p>
                  <p className="text-gray-600">Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#005A8C]">140+</p>
                  <p className="text-gray-600">Projects done</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-b from-[#006897] via-[#006897] to-white">
        <div className='mx-auto px-6 md:px-12 lg:px-8 m-20 bg-[#006897]'>
          <div className='mb-12 space-y-4  text-center' data-aos="fade-up">
            <h1 className='text-[30px] font-bold text-white md:text-[30px] pt-10'>Technology Stack</h1>

          </div>

          <div className='py-20 grid gap-28 md:gap-12 md:grid-cols-5 ' data-aos="fade-up">

            <div className='border-t-2 group text-center'>

              <div className='w-32 h-32 -mt-16 mx-auto rounded-[2rem] overflow-hidden'>
                <h1 className='text-white text-xl font-semibold'>Font-End</h1>
              </div>
              <div>
                <div class="flex justify-start">
                  <TbBrandFlutter size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold '>Flutter</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <IoLogoReact size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>React/React Native</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <RiVuejsLine size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Vue JS</h5>
                </div>
                <div class="flex  justify-start pt-2">
                  <RiAngularjsLine size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold '>Angular</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <TbBrandNextjs size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold '>Next JS</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <SiSvelte size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Svelte</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <BiLogoJquery size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>JQuery</h5>
                </div>
              </div>
            </div>

            <div className='border-t-2 group text-center'>

              <div className='w-32 h-32 -mt-16 mx-auto rounded-[2rem] overflow-hidden'>
                <h1 className='text-xl text-white font-semibold'>Back-End</h1>
              </div>
              <div class='text-center'>
                <div class="flex justify-start">
                  <FaNodeJs size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>NodeJS</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <FaGolang size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>GoLang</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <TbBrandPython size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Python</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <FaJava size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Java</h5>
                </div>

              </div>
            </div>

            <div className='border-t-2 group text-center'>

              <div className='w-32 h-32 -mt-16 mx-auto rounded-[2rem] overflow-hidden'>
                <h1 className='text-white text-xl font-semibold'>DevOps</h1>
              </div>
              <div class='text-center'>
                <div class="flex justify-start">
                  <FaAws size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>AWS</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <SiGooglecloud size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Google Cloud</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <FaDigitalOcean size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Digital Ocean</h5>
                </div>
                <div class="flex  justify-start pt-2">
                  <TbBrandFirebase size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Firebase</h5>
                </div>

              </div>
            </div>


            <div className='border-t-2 group text-center'>

              <div className='w-32 h-32 -mt-16 mx-auto rounded-[2rem] overflow-hidden'>
                <h1 className='text-white text-xl font-semibold'>Database</h1>
              </div>
              <div class='flex flex-col'>
                <div class="flex justify-start">
                  <SiMysql size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>MySql</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <BiLogoPostgresql size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Postgresql</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <TbBrandMongodb size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>MongoDB</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <DiMsqlServer size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>SQLServer</h5>
                </div>
                <div class="flex  justify-start pt-2">
                  <SiAmazondynamodb size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>DynamoDB</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <DiRedis size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Redis</h5>
                </div>
              </div>
            </div>


            <div className='border-t-2 group text-center'>
              <div className='w-32 h-32 -mt-16 mx-auto rounded-[2rem] overflow-hidden'>
                <h1 className='text-white text-xl font-semibold'>Other</h1>
              </div>
              <div class='text-center'>
                <div class="flex justify-start">
                  <FaJenkins size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Jenkins</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <FiGitlab size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>GitLab CI/CD</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <SiCircleci size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Circle CI</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <SiAzuredevops size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Azure DevOps</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <TbBrandAnsible size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Ansible</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <LiaDocker size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Docker</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <BiLogoKubernetes size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Kubernetes</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <img src={terraform} className='w-[24px] h-[24px] mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Teraform</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <SiGrafana size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Grafana</h5>
                </div>
                <div class="flex justify-start pt-2">
                  <SiElasticsearch size={24} className='text-white mr-2' />
                  <h5 class='text-sl text-white font-semibold text-ellipsis'>ELK Stack
                  </h5>
                </div>
                <div class="flex justify-start pt-2">
                  <img src={internetofthings} className='w-[24px] h-[24px] mr-2' />
                  <h5 class='text-sl text-white font-semibold'>IOT
                  </h5>
                </div>
                <div class="flex justify-start pt-2">
                  {/* <AiOutlineApartment size={24} className='text-white mr-2' /> */}
                  <img src={ai} className='w-[24px] h-[24px] mr-2' />
                  <h5 class='text-sl text-white font-semibold'>AI
                  </h5>
                </div>
                <div class="flex justify-start pt-2">
                  <img src={blockchain} className='w-[24px] h-[24px] mr-2' />
                  <h5 class='text-sl text-white font-semibold'>Blockchain
                  </h5>
                </div>

              </div>
            </div>


          </div>
        </div>



        <div>

        </div>

      </div>
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-[#006897] text-2xl font-semibold'>Contact Us</h1>
        <div className="flex justify-center items-center w-full h-full relative">

          <div className="absolute w-[50%] h-[65%] left-[30rem] bg-white shadow shadow-gray-200">
            <div className="flex flex-col p-10 pl-[10rem]">
              <h1 className='text-[#006897] text-xl font-semibold'>Send to message</h1>
              <form className='pt-5'>
                <div className="flex space-x-6">
                  <div className="flex-1 mb-6">
                    <label htmlFor="name" className="block text-lg text-[#006897] mb-2">Your name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#006897]"
                    />
                  </div>
                  <div className="flex-1 mb-6">
                    <label htmlFor="mobile" className="block text-lg text-[#006897] mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobile"
                      placeholder="Enter your mobile number"
                      className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#006897]"
                    />
                  </div>
                </div>

                <div className="flex space-x-6">
                  <div className="flex-1 mb-6">
                    <label htmlFor="subject" className="block text-lg text-[#006897] mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      placeholder="Enter your subject"
                      className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#006897]"
                    />
                  </div>
                  <div className="flex-1 mb-6">
                    <label htmlFor="email" className="block text-lg text-[#006897] mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email address"
                      className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#006897]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-lg text-[#006897] mb-2">Message</label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#006897]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#006897] text-white px-4 py-2 rounded"
                >
                  Submit
                </button>

              </form>
            </div>
          </div>

          <div className="absolute w-[25%] h-[50%] left-[15rem] bg-[#00548C] rounded-[10px]">
            <div className="flex flex-col  p-10">
              <h1 className="text-white text-xl font-semibold">Contact Information</h1>
              <div class="flex justify-start pt-8">
                <IoLocationOutline size={24} className='text-white mr-5' />
                <div>
                  <h5 class='text-sl text-white font-semibold pt-1'>Gennexs Technologies</h5>
                </div>
              </div>
              <div class="flex justify-start pt-5">
                <MdOutlineAttachEmail
                  size={24} className='text-white mr-5' />
                <h5 class='text-sl text-white font-semibold'>info@gennexs.com</h5>
              </div>

              <div class="flex justify-start pt-5">
                <MdOutlinePhone
                  size={24} className='text-white mr-5' />
                <h5 class='text-sl text-white font-semibold'>+91 9876543210</h5>
              </div>

              <div class="flex justify-start pt-5">
                <img src={facebook} className='w-[24px] h-[24px] mr-5' />
                <img src={Vector} className='w-[24px] h-[24px] mr-5' />
                <img src={Instagram} className='w-[24px] h-[24px] mr-5' />
              </div>



            </div>


          </div>


        </div>
      </div>


      <Footer />

    </>
  );
}

export default DashboardUser;
