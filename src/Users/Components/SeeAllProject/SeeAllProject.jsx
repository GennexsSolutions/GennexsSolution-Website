import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import Footer from '../Footer/Footer';

import logo from '../../../assets/images/logog.png'
import facebookcolor from '../../../assets/images/Facebook1.png'
import InstagramColor from '../../../assets/images/Instagram1.png'
import Twitter from '../../../assets/images/Twitter1.png'

function SeeAllProject() {
  const [dataProject, setDataProject] = useState([]);

  const getDataProject = async () => {
    try {
      const res = await axios.get('http://localhost:3000/project/getData');
      console.log("dataProject", res.data.data);
      setDataProject(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataProject();
  }, []);

  return (
    <section className='md:h-full flex flex-col text-gray-600'>
      <Header />
      <div className='container px-5 py-24 mx-auto flex-grow'>
        <div className='pt-[5.1rem] sm:pt-[6rem] md:pt-[5.7rem] lg:pt-20 xl:pt-[5.7rem]'>
          <h1 className='text-2xl font-semibold'>All Project</h1>
        </div>
        <div className='flex flex-wrap -m-4 pt-10'>
          {dataProject.map((project, index) => (
            <div key={index} className='p-4 sm:w-1/2 lg:w-1/3'>
              <div className='h-full rounded-lg border-2 border-gray-200 border-opacity-60 overflow-hidden'>
                <img
                  className='lg:h-72 md:h-48 w-full object-cover object-center'
                  src={`http://localhost:3000/images/${project.image}`}
                  alt=''
                />
                <div className='p-6 hover:bg-[#006897] hover:text-white transition duration-300 ease-in'>
                  <h1 className='text-2xl font-semibold mb-3'>{project.name}</h1>
                  <p className='leading-relaxed mb-3'>{project.subname}</p>
                </div>
              </div>
            </div>
          ))}
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
                    <img src={facebookcolor} className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-3 md:mr-5" />
                    <img src={Twitter} className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-3 md:mr-5" />
                    <img src={InstagramColor} className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] mr-3 md:mr-5" />
                </div>
            </div>
      <Footer />
    </section>
  );
}

export default SeeAllProject;
