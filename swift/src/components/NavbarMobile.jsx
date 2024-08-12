import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext'; // Correct import
import { TbCategory2 } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { IoIosFlash } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import Lottie from 'react-lottie';
import laptopHello from "../assets/laptophello.json";

const NavbarMobile = () => {
  const [login, setLoginStatus] = useState(false);
  const { cartLength } = useCart(); // Use the hook to get cartLength
  console.log(cartLength);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: laptopHello,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const LoginFormFunction = () => {
    setLoginStatus(!login);
  };

  return (
    <div>
      {/* Mobile and small screens */}
      <div className="navbar-mobile fixed bottom-0 left-0 right-0 h-[12vh] bg-gray-300 shadow-lg rounded-tr-lg rounded-tl-lg flex justify-around items-center text-gray-700 md:hidden">
        <Link to="/categories">
          <div className='flex flex-col items-center text-sm'>
            <TbCategory2 className='text-2xl text-gray-500 hover:text-orange-600 transition duration-200 ease-in-out'/>
            <p className='mt-1'>Categories</p>
          </div>
        </Link>
        <Link to="/">
          <div className='flex flex-col items-center text-sm'>
            <FaHome className='text-2xl text-gray-500 hover:text-orange-600 transition duration-200 ease-in-out'/>
            <p className='mt-1'>Home</p>
          </div>
        </Link>
        <Link to="/cart">
          <div className="relative flex flex-col items-center text-sm">
            <div className="relative">
              <HiShoppingCart className="text-3xl text-orange-600" />
              {cartLength > 0 ? (
                <span className="absolute top-0 right-0 w-4 h-4 text-xs flex items-center justify-center bg-black text-white font-bold p-2 rounded-full">
                  {cartLength}
                </span>
              ) : (
                <span className="flex items-center justify-center absolute top-0 right-0 h-4 w-4 text-xs text-white bg-red-400 font-bold p-2 rounded-full">
                  0
                </span>
              )}
            </div>
            <p className="font-semibold text-orange-500">Cart</p>
          </div>
        </Link>
        <Link to="/about">
          <div className='flex flex-col items-center text-sm'>
            <IoIosFlash className='text-2xl text-gray-500 hover:text-orange-600 transition duration-200 ease-in-out'/>
            <p className='mt-1'>About</p>
          </div>
        </Link>
        <div className='flex flex-col items-center text-sm' onClick={LoginFormFunction}>
          <FaRegUserCircle className='text-2xl text-gray-500 hover:text-orange-600 transition duration-200 ease-in-out'/>
          <p className='mt-1'>Contact</p>
        </div>
      </div>

      {/* Medium and larger screens */}
      <div className="hidden md:ml-1 md:flex md:flex-col md:justify-evenly md:w-[20vw] lg:w-[15vw] bg-white shadow-lg fixed top-0 bottom-0 left-0 p-4">
        <div className='flex justify-center'>
          <Lottie options={defaultOptions} height={100} width={150} />
        </div>
        <Link to="/categories" className='flex items-center mb-4  text-sm md:text-xl bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600 p-2 rounded-lg shadow-lg'>
          <TbCategory2 className='text-3xl text-gray-500 hover:text-orange-600'/>
          <p className='ml-2'>Types</p>
        </Link>
        <Link to="/" className='flex items-center mb-4 p-3 text-sm md:text-xl bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600 p-2 rounded-lg shadow-lg'>
          <FaHome className='text-3xl text-gray-500 hover:text-orange-600'/>
          <p className='ml-2'>Home</p>
        </Link>
        <Link to="/cart">
          <div className="relative  flex bg-white shadow-lg  top-0 bottom-0 left-0 p-4  items-center ">
            <div className="relative">
              <HiShoppingCart className="text-3xl text-orange-600" />
              {cartLength > 0 ? (
                <span className="absolute top-0 right-0 w-4 h-4 text-xs flex items-center justify-center bg-black text-white font-bold p-2 rounded-full">
                  {cartLength}
                </span>
              ) : (
                <span className="flex items-center justify-center absolute top-0 right-0 h-4 w-4 text-xs text-white bg-red-400 font-bold p-2 rounded-full">
                  0
                </span>
              )}
            </div>
            <p className="font-semibold text-orange-500 ml-2 md:text-xl">Cart</p>
          </div>
        </Link>
        <Link to="/about" className='flex items-center mb-4 p-3 text-sm md:text-xl bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600 p-2 rounded-lg shadow-lg'>
          <IoIosFlash className='text-3xl text-gray-500 hover:text-orange-600'/>
          <p className='ml-2'>About</p>
        </Link>
        <div className='flex items-center mb-4 p-3 text-sm md:text-xl bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600 p-2 rounded-lg shadow-lg' onClick={LoginFormFunction}>
          <FaRegUserCircle className='text-3xl text-gray-500 hover:text-orange-600'/>
          <p className='ml-2'>Contact</p>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
