import { React, useState, useEffect, useRef } from 'react';
import Header from '../../Components/Header/Header';
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

import logo from '../../../assets/images/logog.png'
import facebookcolor from '../../../assets/images/Facebook1.png'
import InstagramColor from '../../../assets/images/Instagram1.png'
import Twitter from '../../../assets/images/Twitter1.png'

import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';



function DashboardUser() {
  const navigate = useNavigate();
  const timenow = new Date();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dataHome, setDataHome] = useState([]);
  const [dataService, setDataService] = useState([])
  const [dataCustomer, setDataCustomer] = useState([])
  const [dataAbout, setDataAbout] = useState([])
  const [dataProject, setDataProject] = useState([])
  const [dataContact, setDataContact] = useState([])
  const [dialogVisible, setDialogVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const form = useRef();
  const email = useRef();
  const name = useRef();
  const phone = useRef();
  const subject = useRef();
  const remark = useRef();

  const validate = () => {
    const errors = {};
    if (!name.current.value) errors.name = "Name is required";
    if (!phone.current.value) errors.phone = "Phone is required";
    if (!email.current.value) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email.current.value)) {
      errors.email = "Email is invalid";
    }
    if (!remark.current.value) errors.remark = "Remark is required";
    if (!subject.current.value) errors.subject = "Subject is required";
    return errors;
  };
  const sendEmail = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      emailjs
        .sendForm('service_m9h2glf', 'template_42hyqrh', form.current, '_u_vKs3i_y_ToKxX8')
        .then(
          () => {
            name.current.value = '';
            email.current.value = '';
            remark.current.value = '';
            phone.current.value = '';
            subject.current.value = '';
            setDialogVisible(true);
          },
          (error) => {
            console.error('Failed to send email:', error);
          },
        );
    } else {
      setErrors(validationErrors);
    }
  };


  const getConatct = async () => {
    try {
      const res = await axios.get('http://localhost:3000/contact/getData');
      console.log("dataContact", res.data.data);
      setDataContact(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  }


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

  const getDataCutomer = async () => {
    try {
      const res = await axios.get('http://localhost:3000/customers/getData');
      console.log("dataCustomer", res.data.data);
      setDataCustomer(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  const getDataAbout = async () => {
    try {
      const res = await axios.get('http://localhost:3000/about/getData');
      console.log("dataAbout", res.data.data);
      setDataAbout(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  const getDataProject = async () => {
    try {
      const res = await axios.get('http://localhost:3000/project/getData');
      console.log("dataProject", res.data.data);
      setDataProject(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataHome();
    getDataService();
    getDataCutomer();
    getDataAbout();
    getDataProject();
    getConatct();
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
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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





  return (
    <div className='relative'>
      <Header className="sticky top-0 left-0 w-full shadow-md " />
      <section id='home'>
        <div className="pt-[7rem] sm:pt-[7rem] md:pt-[7rem] lg:pt-20 xl:pt-[7.5rem]">
          {
            dataHome.map((item, index) => {
              return (
                <div key={index} className="relative w-full">
                  <img
                    src={`http://localhost:3000/images/${item.image}`}
                    className="relative w-full h-full object-cover filter blur-[2px]"
                  />
                  <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl z-10">
                    {item.description}
                  </h1>
                </div>
              )
            })
          }
          <section id='services'>
            <div className="flex flex-col items-center bg-white text-[#005A8C] text-3xl pt-10">
              <h1><span class="font-bold">Our</span> <span class="font-normal">Services</span></h1>

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
                        <Link to={`/detailsevice/${service._id}`} state={{ service }}>
                          <div className="hover:shadow-lg hover:scale-105 transition-transform duration-300">
                            <Card {...service} />
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <div className="w-full sm:w-3/4 m-auto p-4 sm:p-10 z-0">
        <section id='project'>
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
            <h1><span class="text-[#005A8C] text-3xl font-bold">Our</span> <span class="text-[#005A8C] text-3xl font-normal">Projects</span></h1>

            <button onClick={() => navigate('/seeallproject')} className="text-[#005A8C] text-lg sm:text-xl font-bold">See All</button>
          </div>
        </section>
        <div className="mt-10 sm:mt-20 mb-10 sm:mb-20">
          <Slider {...settings}>
            {dataProject.map((item, index) => (
              <div
                key={index}
                className="h-auto w-full bg-gradient-to-b to-[#005A8C] from-white text-black rounded-b-xl p-4 overflow-hidden sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <Link to={`/detailproject/${item._id}`} state={{ item }}>
                  <div className="flex flex-col md:flex-row w-full rounded-sm gap-4 items-start">
                    <div className="bg-white rounded-lg border-2 border-white flex justify-center items-center md:justify-center md:items-center">
                      <img
                        src={`http://localhost:3000/images/${item.image}`}
                        className="w-full h-auto max-w-[30rem] rounded-lg object-cover md:h-[40vh] md:w-[30rem] md:max-h-[40vh]"
                        alt="Image"
                      />

                    </div>
                    <div className="flex flex-col mt-4 md:mt-0">
                      <div className="font-bold text-lg md:text-xl text-[#005A8C]">{item.name}</div>
                      <div className="mt-2">
                        {item.description.map((i, index) => (
                          <div key={index} className="mt-1">
                            {i.subtitle.map((e, subIndex) => (
                              <div key={subIndex} className="text-sm md:text-bas">
                                {e.namesubtitle}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <section id='about'>
          <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
            <div className="p-4 max-w-4xl w-full flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center items-center">
                <div className="bg-gray-200 rounded-lg p-4 w-full flex items-center justify-center">
                  <img src={gennex} className="w-full h-auto max-w-xs md:max-w-full" />
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h1><span class="text-[#005A8C] text-3xl font-bold">About</span> <span class="text-[#005A8C] text-3xl font-normal">The Company</span></h1>
                {
                  dataAbout.map((item) => {
                    return (
                      <div>
                        <p className="mb-6">
                          {item.description}
                        </p>
                        <div className="flex flex-col md:flex-row justify-between text-center">
                          <div className="mb-4 md:mb-0">
                            <p className="text-3xl font-bold text-[#005A8C]">{item.founder}+</p>
                            <p className="text-gray-600">Founded</p>
                          </div>
                          <div className="mb-4 md:mb-0">
                            <p className="text-3xl font-bold text-[#005A8C]">{item.clients}+</p>
                            <p className="text-gray-600">Clients</p>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-[#005A8C]">{item.projects}+</p>
                            <p className="text-gray-600">Projects done</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </section>
      </div>


      <div className="mb-8 md:mb-12 text-center">
        <h1 className="text-[30px] md:text-4xl lg:text-[30px] font-bold text-[#005A8C] p-2 animated-underline">
          Customer
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 pb-20 md:pb-10">
        {
          dataCustomer.map((item) => (
            <div className="flex flex-col items-center">
              <div key={item.id} className="relative w-52 h-52 bg-white rounded-full overflow-hidden p-2">
                <div className="absolute inset-2.5 border-4 border-[#006897] z-20 rounded-full overflow-hidden flex justify-center items-center flex-col content custom-cursor-container">
                  <img src={`https://api-website-admin-gennexsolutions.onrender.com/images/${item.image}`} alt="logo" className="absolute top-0 left-0 w-full h-full object-cover transition duration-500 pointer-events-none z-20" />
                </div>

              </div>
              <h1 className="mt-4 text-cente">{item.name}</h1>
            </div>

          ))
        }
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
      <section id="contact">
        <h1 className="flex justify-center text-[#006897] text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold">
          Contact Us
        </h1>

        <div className='flex flex-col justify-center items-center h-screen'>

          <div className="flex flex-col-reverse md:flex-row gap-y-3 justify-center items-center w-full h-full md:relative">

            <div className="md:absolute w-[80%] md:w-[50%] z-index-0 md:left-[30rem] bg-white shadow shadow-gray-200">
              <div className="flex flex-col p-10 md:pl-[10rem]">
                <h1 className='text-[#006897] text-xl font-semibold'>Send to message</h1>
                <form ref={form} className='pt-5'>
                  <div className="flex space-x-6">
                    <div className="flex-1 mb-6">
                      <label htmlFor="name" className="block text-lg text-[#006897] mb-2">Your name</label>
                      <input
                        ref={name}
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#006897]"
                      />
                      {errors.name && <span className="text-red-500">{errors.name}</span>}
                    </div>
                    <div className="flex-1 mb-6">
                      <label htmlFor="mobile" className="block text-lg text-[#006897] mb-2">Mobile Number</label>
                      <input
                        ref={phone}
                        type="tel"
                        id="mobile"
                        placeholder="Enter your mobile number"
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#006897]"
                      />
                      {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="flex space-x-6">
                    <div className="flex-1 mb-6">
                      <label htmlFor="subject" className="block text-lg text-[#006897] mb-2">Subject</label>
                      <input
                        ref={subject}
                        type="text"
                        id="subject"
                        placeholder="Enter your subject"
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#006897]"
                      />
                      {errors.subject && <span className="text-red-500">{errors.subject}</span>}
                    </div>
                    <div className="flex-1 mb-6">
                      <label htmlFor="email" className="block text-lg text-[#006897] mb-2">Email Address</label>
                      <input
                        ref={email}
                        type="email"
                        id="email"
                        placeholder="Enter your email address"
                        className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#006897]"
                      />
                      {errors.email && <span className="text-red-500">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-lg text-[#006897] mb-2">Message</label>
                    <textarea
                      ref={remark}
                      id="message"
                      placeholder="Enter your message"
                      className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-[#006897]"
                    ></textarea>
                    {errors.remark && <span className="text-red-500">{errors.remark}</span>}
                  </div>

                  <button
                    onClick={sendEmail}
                    type="submit"
                    className="bg-[#006897] text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>

                </form>
              </div>
            </div>

            <div className="md:absolute w-[80%]  md:w-[50%] md:lg:w-[25%] h-auto md:h-[50%] md:left-[5rem] lg:left-[15rem] bg-[#00548C] rounded-[10px] p-4 md:p-10">
              {
                dataContact.map((item, index) => {
                  return (
                    <div className="flex flex-col">
                      <h1 className="text-white text-lg md:text-xl font-semibold">Contact Information</h1>

                      <div className="flex items-start pt-8">
                        <IoLocationOutline size={24} className='text-white mr-5' />
                        <div>
                          <h5 className='text-sm md:text-base text-white font-semibold pt-1'>{item.village}</h5>
                        </div>
                      </div>

                      <div className="flex items-start pt-5">
                        <MdOutlineAttachEmail size={24} className='text-white mr-5' />
                        <h5 className='text-sm md:text-base text-white font-semibold'>{item.email}</h5>
                      </div>

                      <div className="flex items-start pt-5">
                        <MdOutlinePhone size={24} className='text-white mr-5' />
                        <h5 className='text-sm md:text-base text-white font-semibold'>{item.tell}</h5>
                      </div>

                      <div className="flex items-start pt-5">
                        <a href='https://www.facebook.com/Lsservice1234?mibextid=qi2Omg&rdid=XKpypUslYQjlSALD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FB4Vru8evYRNE75Dq%2F%3Fmibextid%3Dqi2Omg' target="_blank" rel="noopener noreferrer" title="Facebook">
                          <img src={facebook} className='w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-3 md:mr-5' />
                        </a>

                        <a href='https://x.com/GennexSolu74014' target="_blank" rel="noopener noreferrer" title="Twitter">
                          <img src={Vector} className='w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-3 md:mr-5' />
                        </a>
                        <a href='https://www.linkedin.com/in/gennex-solutions-0167b3315/' target="_blank" rel="noopener noreferrer" title="Instagram">
                          <img src={Instagram} className='w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-3 md:mr-5' />
                        </a>
                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>



        </div>
        <div className="flex flex-col md:flex-row md:space-x-[12rem] justify-between items-center pt-10 md:pt-[2rem] pl-4 md:pl-[10rem] pb-10">
          <img src={logo} alt="logo" className="w-50 h-[80px] md:w-60 md:h-[100px]" />

          <div className="flex flex-col mt-4 md:mt-0">
            <h1 className="text-[#006897] font-bold text-xl md:text-2xl">About</h1>
            <h1 className="text-sm md:text-base text-center md:text-left">
              Website jasa digital marketing, design grafis dan pembuatan website
            </h1>
          </div>

          <div className="flex flex-row mt-4 md:mt-0 pr-4 md:pr-[12rem]">
            <a href='https://www.facebook.com/Lsservice1234?mibextid=qi2Omg&rdid=XKpypUslYQjlSALD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FB4Vru8evYRNE75Dq%2F%3Fmibextid%3Dqi2Omg' target="_blank" rel="noopener noreferrer" title="Facebook">
              <img src={facebookcolor} className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-3 md:mr-5" />
            </a>
            <a href='https://x.com/GennexSolu74014' target="_blank" rel="noopener noreferrer" title="Twitter">
              <img src={Twitter} className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-3 md:mr-5" />
            </a>
            <a href='https://www.linkedin.com/in/gennex-solutions-0167b3315/' target="_blank" rel="noopener noreferrer" title="Instagram">
              <img src={InstagramColor} className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-3 md:mr-5" />
            </a>
          </div>
        </div>
      </section>

      {dialogVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Your inquiry has been sent!</h2>
            <p>Thank you for contacting us. Our team will respond to you promptly</p>
            <button onClick={closeDialog} className="mt-4 px-4 py-2 bg-[#006897] text-white rounded-md">
              OK
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default DashboardUser;
