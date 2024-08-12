import React, { useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import axios from "axios";

const Dairy = ({ items }) => {
  const [quantities, setQuantities] = useState({});

  // Get userId from localStorage
  const userDataString = localStorage.getItem("userData");
  let userId = 'Guest'; // Default value if userData is not available

  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      userId = userData.uuid || 'Guest'; // Default to 'Guest' if uuid is not found
    } catch (error) {
      console.error('Error parsing userData:', error);
    }
  }

  const increaseFunction = async (item) => {
    const { _id, name, price, discount, image } = item;
    
    // Increase the quantity locally
    setQuantities((prev) => ({
      ...prev,
      [_id]: (prev[_id] || 0) + 1,
    }));

    try {
      // Call the API to update the cart
      await axios.post('http://localhost:5000/addTocart', {
        id: _id,
        name,
        price,
        discount,
        image,
        userId, // Use the userId from localStorage
        quantity: (quantities[_id] || 0) + 1, // Correct key
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Optionally revert local state if API call fails
     
    }
  };

  const decreaseFunction = async (item) => {
    const { _id } = item;
    
    // Decrease the quantity locally, but don't go below zero
    setQuantities((prev) => ({
      ...prev,
      [_id]: Math.max((prev[_id] || 0) - 1, 0),
    }));

    try {
      // Call the API to update the cart
      await axios.post('http://localhost:5000/remove', {
        id: _id,
        userId, // Use the userId from localStorage
        quantity: Math.max((quantities[_id] || 0) - 1, 0), // Correct key
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      // Optionally revert local state if API call fails
      
    }
  };

  return (
    <div className="grid md:ml-48 overflow-y-auto mb-10 shadow-xl backdrop-blur-lg grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:ml-64 gap-4">
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl flex flex-col justify-around h-auto p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <p className="mb-4 text-sm bg-orange-600 p-3 float-right text-white font-bold rounded-full ">
              {item.discount}% OFF
            </p>

            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-[70px] md:h-[140px] lg:h-[210px] object-cover rounded-lg"
              />
            )}
            <p className="font-semibold">{item.name}</p>
            <p>1 Piece</p>
            <p className="text-orange-500 font-semibold p-1 w-11 md:w-[60px] mt-1">
              ₹{item.price}
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => decreaseFunction(item)}
                className="bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600 p-2 rounded-lg shadow-lg"
              >
                <IoMdRemove />
              </button>
              <p>{quantities[item._id] || 0}</p>
              <button
                onClick={() => increaseFunction(item)}
                className="bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600 p-2 rounded-lg shadow-lg"
              >
                <IoMdAdd />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dairy;
