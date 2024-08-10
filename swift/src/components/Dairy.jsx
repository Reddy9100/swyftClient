import React from 'react';
import { IoMdAdd } from "react-icons/io";

const Dairy = ({ items }) => {
    console.log("Vegetables component items:", items); // Log to verify items
    return (
        <div className="grid md:ml-48  overflow-y-auto mb-10 shadow-xl backdrop-blur-lg grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:ml-64 gap-4">
            {items.length === 0 ? (
                <p>No items available</p> // Handle empty array case
            ) : (
                items.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white  rounded-xl flex flex-col justify-around  h-auto p-8  shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <p className="mb-4 text-sm bg-orange-600 p-3 float-right text-white font-bold rounded-full ">{item.discount}% OFF</p>

                        
                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-[70px] md:h-[140px] lg:h-[210px] object-cover rounded-lg"
                            />
                        )}
                        <p className='font-semibold'>{item.name}</p>
                        <p>1 Peice</p>
                        <div className='flex justify-between items-center'>
                        <p className="text-orange-500 font-semibold  p-1 w-11 md:w-[60px]  mt-1">₹{item.price}</p>
                        <button className="bg-white bg-opacity-80 backdrop-blur-3xl border border-white/10 text-orange-600 p-2 rounded-lg shadow-lg">
  <IoMdAdd/>
</button>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dairy;
