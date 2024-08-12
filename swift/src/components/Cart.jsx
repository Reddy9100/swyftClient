import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "antd";
import AddressModal from "../components/AdressForm"; // Make sure the path is correct
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
import emptyCart from "../assets/emptycart.json";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [buy, setBuy] = useState(false);
  const history = useNavigate(); // Initialize useHistory for navigation

  const toggleAddressModal = () => {
    if (cartItems.length === 0) {
      toast.error("Add items to cart");
      setTimeout(()=>{
        history("/categories");
      },3000)
      
    } else {
      setBuy(!buy);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyCart,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userDataString = localStorage.getItem("userData");
        let userId = "Guest"; // Default value if userData is not available

        if (userDataString) {
          try {
            const userData = JSON.parse(userDataString);
            userId = userData.uuid || "Guest"; // Default to 'Guest' if uuid is not found
          } catch (error) {
            console.error("Error parsing userData:", error);
          }
        }

        const response = await axios.post("http://localhost:5000/cart", { userId });
        console.log("API Response:", response.data); // Verify the data structure
        setCartItems(response.data.cartItems); // Set the state with the fetched data
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/removefromcart`, { data: { itemId } });
      setCartItems(cartItems.filter((item) => item._id !== itemId));
      toast.success("Item Removed");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Error removing item");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const discountedPrice = item.price * (item.discount / 100);
    const finalPrice = (item.price - discountedPrice) * item.quantity;
    return acc + finalPrice;
  }, 0);

  return (
    <>
      {!buy ? (
        <>
          <Toaster />
          <div className="container overflow-y-auto h-[70vh] mx-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex justify-center items-center h-[70vh]">
                <Lottie options={defaultOptions} height={350} width={400} />
              </div>
            ) : (
              cartItems.map((item) => {
                const discountedPrice = item.price * (item.discount / 100);
                const finalPrice = (item.price - discountedPrice) * item.quantity;

                return (
                  <div
                    key={item._id}
                    className="relative flex items-center md:ml-36 lg:ml-44 xl:ml-56 justify-around mb-3  p-8 bg-white rounded-lg shadow-lg"
                  >
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="absolute top-0 right-2 text-orange-600 bg-white/25 backdrop-blur-sm shadow-lg  rounded-full  w-8 h-8 flex items-center justify-center"
                    >
                      <IoIosCloseCircleOutline/>
                    </button>
                    <Tooltip title={item.name}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                      />
                    </Tooltip>
                    <div>
                      <p className="font-semibold mr-2">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex flex-col justify-around items-center">
                      <p className="line-through text-red-500">₹{item.price * item.quantity}</p>
                      <p className="font-bold text-green-500">₹{finalPrice}</p>
                    </div>
                  </div>
                );
              })
            )}
            <div className="fixed md:ml-20 lg:ml-24 xl:ml-24 bottom-16 md:bottom-0 left-0 w-full bg-opacity-50 backdrop-blur-md bg-white p-4 shadow-lg">
              <div className="container mx-auto flex justify-around items-center">
                <h3 className="text-xl font-bold">Subtotal</h3>
                <p className="text-lg font-bold text-purple-600">₹{subtotal}</p>
              </div>
              <div className="flex mt-4 mb-5 justify-center items-center">
                <button
                  onClick={toggleAddressModal}
                  className="bg-black font-bold text-white p-3 w-full md:w-96 lg:w-[800px] mx-auto"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <AddressModal />
      )}
    </>
  );
};

export default Cart;
