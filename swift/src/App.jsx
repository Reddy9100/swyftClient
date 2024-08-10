import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios'; // Import axios here
import InitialScreen from './components/InitialScreen';
import Categories from './components/categories';
import Dashboard from './components/Dashboard';
import NavbarMobile from './components/NavbarMobile';
import SignupModal from "./components/signupModal";
import Vegetables from './components/Vegetables';

const App = () => {
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [items, setItems] = useState([]);
  const[vegetables,setVegetables] = useState([])

  useEffect(() => {
    // Fetch data when component mounts
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/items");
        console.log("Fetched data:", response.data); // Log the response
        setVegetables(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchItems();
  }, []); // Dependency array is empty, fetches data once on mount

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialScreen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  console.log(vegetables)
  const filterVegetables = vegetables.filter((item) => item.category === 'fruit' || item.category === 'vegetable');

  
  return (

    <div>
      {showInitialScreen ? (
        <InitialScreen />
      ) : (
        <Router>
          <Routes>
            <Route path="/login" element={<SignupModal />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/vegetables&fruits" element={<Vegetables items={filterVegetables} />} />
          </Routes>
          <NavbarMobile />
        </Router>
      )}
    </div>
  );
};

export default App;
