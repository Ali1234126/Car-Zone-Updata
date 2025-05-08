import React, { useState } from "react";
import cars from "../data/carsData.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/store.css";
import Header from "../components/header";
import Footer from "../components/Footer";
import { useEffect } from "react";

const Store = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");

  const [cart, setCart] = useState([]);

  const handleAddToCart = (car) => {
    setCart([...cart, car]);
    toast.success("Car added to cart successfully!");
  };

  const filteredCars = cars.filter((car) => {
    const matchesPrice =
      (minPrice
        ? parseFloat(car.price.replace("$", "").replace(",", "")) >= minPrice
        : true) &&
      (maxPrice
        ? parseFloat(car.price.replace("$", "").replace(",", "")) <= maxPrice
        : true);
    const matchesYear = yearFilter ? car.year.toString() === yearFilter : true;

    return (
      (car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.color.toLowerCase().includes(searchTerm.toLowerCase())) &&
      matchesPrice &&
      matchesYear
    );
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === "price-asc") {
      return (
        parseFloat(a.price.replace("$", "").replace(",", "")) -
        parseFloat(b.price.replace("$", "").replace(",", ""))
      );
    } else if (sortBy === "price-desc") {
      return (
        parseFloat(b.price.replace("$", "").replace(",", "")) -
        parseFloat(a.price.replace("$", "").replace(",", ""))
      );
    } else if (sortBy === "year-asc") {
      return a.year - b.year;
    } else if (sortBy === "year-desc") {
      return b.year - a.year;
    }
    return 0;
  });

  const handleSearch = () => {
    if (filteredCars.length === 0) {
      toast.error("No cars matching your search");
    }
  };
 
   

   
   // Scroll to Top Button
  const [showButton, setShowButton] = useState(false);
    
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY >= 100) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  return (
    <>
      <ToastContainer />
      <Header />
      <button
      id="btnScroll"
      onClick={scrollToTop}
      className={showButton ? "show" : ""}
    >
      <i className="fa fa-arrow-up" aria-hidden="true"></i>
    </button>  
      <div className="store-container">
        <h1 className="store-title">Car Store 🚗</h1>

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by car name or color..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            onKeyUp={handleSearch}
          />
        </div>

        {/* Filter Section */}
        <div className="filter-wrapper">
          <div className="filter-container">
            <label className="filter-label" htmlFor="car-color">
              Filter by Color:
            </label>
            <select
              id="car-color"
              className="filter-select"
              onChange={(e) => setSearchTerm(e.target.value)} // Assuming filtering by color
            >
              <option value="">Select Color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="black">Black</option>
              <option value="white">White</option>
            </select>
          </div>

          <div className="filter-container">
            <label className="filter-label" htmlFor="car-price">
              Filter by Price:
            </label>
            <input
              type="number"
              id="car-price"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="filter-input"
            />
            <input
              type="number"
              id="car-price-max"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-container">
            <label className="filter-label" htmlFor="year-filter">
              Filter by Year:
            </label>
            <select
              id="year-filter"
              className="filter-select"
              onChange={(e) => setYearFilter(e.target.value)}
              value={yearFilter}
            >
              <option value="">All Years</option>
              <option value="2013">2013</option>
              <option value="2017">2017</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>

          {/* Sort Section */}
          <div className="sort-wrapper">
            <select
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
              className="sort-select"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-asc">Year: Old to New</option>
              <option value="year-desc">Year: New to Old</option>
            </select>
          </div>
        </div>
        <div className="car-grid">
          {sortedCars.map((car, index) => (
            <div key={index} className="car-card">
              <img src={car.image} alt={car.name} className="car-image" />
              <h3 className="car-name">{car.name}</h3>
              <p className="car-price">{car.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(car)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Store;
