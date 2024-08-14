import React from 'react';
import Slider from 'react-slick';
import NavbarMobile from './NavbarMobile';
import Lottie from 'lottie-react';
import animationData1 from '../assets/fruitsHero.json';
import animationData2 from '../assets/coffeeHero.json';
import animationData3 from '../assets/juiceHero.json';
import animationData4 from '../assets/sweetHero.json';
import animationData5 from '../assets/vegetablesHero.json';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const animations = [animationData1, animationData2, animationData3, animationData4, animationData5];

  const settings = {
   
    autoplay: true,
    infinite: true,
    speed: 5000, // Slow down the carousel speed
    slidesToShow: 1,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    adaptiveHeight: true,
    pauseOnHover: false,
    
  };

  return (
    <>
    <div className='overflow-x-hidden md:ml-36 lg:ml-44 xl:ml-64'>
      <Slider {...settings}>
        {animations.map((animation, index) => (
          <div key={index}>
            <div className="relative h-[100vh] bg-orange-100/55">
              <Lottie animationData={animation} loop={true} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </Slider>

     
      <div className=" fixed  md:ml-36 lg:ml-44 xl:ml-64 inset-0 flex flex-col items-center justify-center md:justify-end text-center bg-opacity-0 bg-gray-900 text-clip p-4">
        <h2 className="text-4xl font-bold mb-4 text-clip text-black">Welcome to <span className='text-purple-600 animate-pulse transition-shadow'>Swifty</span> Grocery Delivery App</h2>
        <p className="mb-6 text-lg text-clip">Get your groceries delivered fast and fresh to your doorsteps.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/categories"><button className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-orange-600 transition">Shop Now</button></Link>
        </div>
      </div>

      <NavbarMobile />
      </div>
    </>
  );
};

export default Dashboard;
