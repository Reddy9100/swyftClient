import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import grocery from "../assets/grocery.jpg";
import dairy from '../assets/dairy.jpg';
import rice from '../assets/rice.jpg';
import meat from '../assets/meat.jpg';
import masala from '../assets/masala.jpg';
import breakfast from '../assets/breakfast.jpg';
import packaged from '../assets/packaged.jpg';
import Lottie from 'react-lottie';
import kitchen from "../assets/kitchen.json";
import ice from "../assets/ice.json";
import bannerbird from "../assets/bannerbird.jpeg";
import icecream from "../assets/cream.jpg";
import coke from "../assets/coke.jpg";
import choclate from "../assets/choclate.jpg"
import iced from "../assets/iced.jpg";
import tea from "../assets/tea.jpg";
import biscuit from "../assets/biscuit.jpg";
import lays from "../assets/lays.jpg";
import vegetablesImg from "../assets/vegetables.jpg"
const Categories = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: kitchen,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: ice,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const categories1 = [
    { image: vegetablesImg, label: "Fruits & Vegetables", link: "/vegetables&fruits" },
    { image: dairy, label: "Dairy, Bread & Eggs", link: "/dairy-bread-eggs" },
    { image: rice, label: "Atta, Rice, Oil & Dals", link: "/atta-rice-oil-dals" },
    { image: meat, label: "Meat, Fish & Eggs", link: "/meat-fish-eggs" },
    { image: masala, label: "Masala & Dry Fruits", link: "/masala-dry-fruits" },
    { image: breakfast, label: "Breakfast & Sauces", link: "/breakfast-sauces" },
    { image: packaged, label: "Packaged Food", link: "/packaged-food" },
  ];

  const categories2 = [
    { image: tea, label: "Tea, Coffee & More", link: "/tea-coffee-more" },
    { image: icecream, label: "Ice Creams & More", link: "/ice-creams-more" },
    { image: iced, label: "Frozen Food", link: "/frozen-food" },
    { image: choclate, label: "Sweet Cravings", link: "/sweet-cravings" },
    { image: coke, label: "Cold Drinks & Juices", link: "/cold-drinks-juices" },
    { image: lays, label: "Munchies & Chips", link: "/munchies-chips" },
    { image: biscuit, label: "Biscuits & Cookies", link: "/biscuits-cookies" },
  ];

  // Function to get a random column span between 1 and 4
  const getRandomColSpan = () => Math.floor(Math.random() * 2) + 1;

  return (
    <div className='bg-white md:ml-36 lg:ml-48 xl:ml-56 h-screen overflow-y-auto'>
      <img src={bannerbird} className='h-[30vh] md:h-[50vh] w-full' alt="Banner" />
      <div className='flex mt-4 justify-around items-center'>
        <h2 className='text-lg md:text-xl font-bold'>All Categories</h2>
      </div>
      <hr className='border-t border-gray-300' />

      {/* Grocery & Kitchen Section */}
      <div className='p-4'>
        <div className='flex items-center'>
          <div className="h-[60px] md:h-[120px] shadow-sm border border-5 border-orange-500 rounded-[90%] p-2">
            <Lottie options={defaultOptions} />
          </div>
          <h2 className='text-md ml-3 md:text-lg font-bold mb-2'>Grocery & Kitchen</h2>
        </div>
        <div className='grid mt-6 grid-cols-3 md:grid-cols-3 lg:grid-cols-4  gap-4 md:gap-20'>
          {categories1.map((category, index) => (
            <CategoryItem 
              key={index} 
              image={category.image} 
              label={category.label} 
              link={category.link} 
              colSpan={getRandomColSpan()} 
            />
          ))}
        </div>
      </div>

      {/* Snacks & Drinks Section */}
      <div className='p-4 mb-10 mt-10 md:mt-20'>
        <div className='flex items-center'>
          <div className='h-[60px] md:h-[120px] shadow-sm border border-5 border-orange-500 rounded-[90%] p-2'>
            <Lottie options={defaultOptions2} />
          </div>
          <h2 className='text-md ml-3 md:text-lg font-bold mb-2'>Snacks & Drinks</h2>
        </div>
        <div className='grid mt-6 md:mt-10 mb-10  md:grid-cols-3 lg:grid-cols-4 grid-cols-3 gap-4 md:gap-20 md:mb-5'>
          {categories2.map((category, index) => (
            <CategoryItem 
              key={index} 
              image={category.image} 
              label={category.label} 
              link={category.link} 
              colSpan={getRandomColSpan()} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoryItem = ({ image, label, link, colSpan }) => {
  return (
    <Link to={link} className={`text-center h-32 col-span-${colSpan} block`}>
      <div className="relative p-2 rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <img 
          src={image} 
          alt={label} 
          loading='lazy'
          className="h-[70px] md:h-[140px] w-full p-1 rounded-md" 
        />
        <h3 className='font-medium text-xs md:text-lg mt-2'>{label}</h3>
      </div>
    </Link>
  );
};

export default Categories;
