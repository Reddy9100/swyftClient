import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import InitialScreen from "./components/InitialScreen";
import NavbarMobile from "./components/NavbarMobile";
import SignupModal from "./components/signupModal";
import ProtectedRoute from "./components/ProctectedRoute";
import Lottie from "react-lottie";
import loader from "./assets/loader.json";
import Cart from "./components/Cart";

// Lazy loading components
const Categories = lazy(() => import("./components/categories"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Vegetables = lazy(() => import("./components/Vegetables"));
const Dairy = lazy(() => import("./components/Dairy"));
const AttaComponent = lazy(() => import("./components/Atta"));
const IceCream = lazy(() => import("./components/Ice"));
const Meat = lazy(() => import("./components/Meat"));
const DryFruits = lazy(() => import("./components/DryFruits"));
const BreakFast = lazy(() => import("./components/BreakFast"));
const Packets = lazy(() => import("./components/Packets"));

// Custom Loader Component
const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="loader-container flex justify-center items-center h-[100vh]">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

const App = () => {
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [showLoader, setShowLoader] = useState(false); // State for loader visibility
  const [vegetables, setVegetables] = useState([]);
  const [DairyItems, setDairy] = useState([]);
  const [Atta, setAtta] = useState([]);
  const [meat, setMeat] = useState([]);
  const [ice, setIce] = useState([]);
  const [dry, setDry] = useState([]);
  const [Breakfast, setBreakFast] = useState([]);
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/items");
        setVegetables(response.data);
        setDairy(response.data);
        setAtta(response.data);
        setIce(response.data);
        setMeat(response.data);
        setDry(response.data);
        setBreakFast(response.data);
        setPackets(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialScreen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleRouteChange = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 5000);
  };

  const filterVegetables = vegetables.filter(
    (item) => item.category === "fruit" || item.category === "vegetable"
  );
  const filterDairy = DairyItems.filter((item) => item.category === "dairy");
  const filterAtta = Atta.filter((item) => item.category === "atta");
  const filterIce = ice.filter((item) => item.category === "ice");
  const filterMeat = meat.filter((item) => item.category === "meat");
  const filterDry = dry.filter((item) => item.category === "dryfruits");
  const filterBreakFast = Breakfast.filter(
    (item) => item.category === "breakfast"
  );
  const filterPackets = packets.filter((item) => item.category === "packets");

  return (
    <div>
      {showInitialScreen ? (
        <InitialScreen />
      ) : (
        <Router>
          {showLoader ? (
            <Loader />
          ) : (
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route exact path="/login" element={<SignupModal />} />
                <Route
                  exact
                  path="/"
                  element={
                    <ProtectedRoute
                      element={Dashboard}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
                <Route
                  exact
                  path="/categories"
                  element={
                    <ProtectedRoute
                      element={Categories}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
                <Route
                  exact
                  path="/vegetables&fruits"
                  element={
                    <ProtectedRoute
                      element={() => <Vegetables items={filterVegetables} />}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
                <Route
                  exact
                  path="/dairy-bread-eggs"
                  element={
                    <ProtectedRoute
                      element={() => <Dairy items={filterDairy} />}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
                <Route
                  exact
                  path="/atta-rice-oil-dals"
                  element={
                    <ProtectedRoute
                      element={() => <AttaComponent items={filterAtta} />}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
                <Route
                  exact
                  path="/ice-creams-more"
                  element={
                    <ProtectedRoute
                      element={() => <IceCream items={filterIce} />}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
                <Route
                  exact
                  path="/meat-fish-eggs"
                  element={
                    <ProtectedRoute
                      element={() => <Meat items={filterMeat} />}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
                <Route
                  exact
                  path="/masala-dry-fruits"
                  element={
                    <ProtectedRoute
                      element={() => <DryFruits items={filterDry} />}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
                <Route
                  exact
                  path="/breakfast-sauces"
                  element={
                    <ProtectedRoute
                      element={() => <BreakFast items={filterBreakFast} />}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
                <Route
                  exact
                  path="/packaged-food"
                  element={
                    <ProtectedRoute
                      element={() => <Packets items={filterPackets} />}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
                <Route
                  exact
                  path="/cart"
                  element={
                    <ProtectedRoute
                      element={() => <Cart />}
                      onRouteChange={handleRouteChange}
                    />
                  }
                />
              </Routes>
            </Suspense>
          )}
          <NavbarMobile />
        </Router>
      )}
    </div>
  );
};

export default App;
