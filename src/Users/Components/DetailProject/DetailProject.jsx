import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import Card from '../Card/CardService';
import Footer from '../Footer/Footer';
import logo from '../../../assets/images/logog.png';
import facebookcolor from '../../../assets/images/Facebook1.png';
import InstagramColor from '../../../assets/images/Instagram1.png';
import Twitter from '../../../assets/images/Twitter1.png';

function DetailProject() {
    const location = useLocation();
    const { projects } = location.state || {}; // Access the passed data
    const [dataProject, setDataProject] = useState([]);

    console.log("location.state:", location.state);


    console.log("new", projects);

    if (!location.state) {
        return <div>No project data available</div>;
    }

    const getDataProject = async () => {
        try {
            const res = await axios.get('http://localhost:3000/project/getData');
            console.log("dataService", res.data.data);
            setDataProject(res.data.data || []);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDataProject();

    }, []);

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center pt-[5.1rem] sm:pt-[6rem] md:pt-[5.7rem] lg:pt-[2.5rem] xl:pt-[5.7rem]">
                <div className="flex flex-col items-center pt-[5.1rem] sm:pt-[6rem] md:pt-[5.7rem] lg:pt-[2.5rem] xl:pt-[5.7rem]"> {/* Center the image and name */}
                    <img
                        src={`http://localhost:3000/images/${location.state.item.image}`}
                        className="w-[100px] h-[100px]"
                        alt={location.state.item.name}
                    />
                    <p className="mt-4 text-3xl font-semibold text-center text-[#006897]">{location.state.item.name}</p>
                </div>
            </div>
            <div className='pl-4 md:pl-[15rem]'>
                {location.state.item.description.map((item, index) => (
                    <div key={index} className='flex flex-col'>
                        <h1 className="mt-4 text-lg md:text-xl font-semibold">
                            {index + 1}. {item.title}
                        </h1>
                        <div>
                            {item.subtitle.map((e, subIndex) => (
                                <p key={subIndex} className="mt-2 md:mt-4 text-justify">
                                    {index + 1}.{subIndex + 1} {e.namesubtitle}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <h1 className='text-3xl md:text-4xl font-semibold text-center pt-[10rem] text-[#006897]'>All Project</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 justify-items-center p-20">
                {dataProject.map((service, index) => {
                    const isLastRowWithTwoItems =
                        dataProject.length % 3 === 2 && index >= dataProject.length - 2;
                    return (
                        <div
                            key={index}
                            className={`flex ${isLastRowWithTwoItems && index === dataProject.length - 1
                                ? 'col-span-2'
                                : ''
                                }`}
                        >
                            <div className="hover:shadow-lg hover:scale-105 transition-transform duration-300 flex items-center p-5">
                                <img src={`http://localhost:3000/images/${service.image}`} className="w-16 h-16 mr-4" />
                                <div>
                                    <h1>{service.name}</h1>
                                    <div>{service.description.map((i) => (
                                        <div>{
                                            i.subtitle.map((j) => (
                                                <div>{j.namesubtitle}</div>
                                            ))
                                        }</div>
                                    ))}</div>
                                </div>
                            </div>

                        </div>
                    );
                })}
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
        </div>
    );
}
export default DetailProject;
