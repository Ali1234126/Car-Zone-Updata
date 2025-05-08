import { useState,useEffect } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from "../components/header"
 import Banner from '../assets/images/banner-img.png'
import Footer from '../components/Footer'
import Offers from '../components/offers'

function Home() {
  const [showButton, setShowButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
  <Header/>
  <button
      id="btnScroll"
      onClick={scrollToTop}
      className={showButton ? "show" : ""}
    >
      <i className="fa fa-arrow-up" aria-hidden="true"></i>
    </button>  
  {/* about us */}
  <div className="main">
      <div className="content">
        <div className="about-text">
          <h2>
            about <span> us</span>
          </h2>
          <p>
            Car Zone is a well-established automotive service center with three
            branches offering top-tier services across various locations. We
            specialize in car repairs, maintenance, and parts replacement to
            ensure your vehicle runs smoothly. Our mission is to provide
            customer-oriented solutions, combining professionalism with a
            passion for cars...
         
          {/* to hide and show the button */}
          {!isExpanded && (
            <Link className="btn-about-us" to="#" onClick={() => setIsExpanded(true)}>Read More
            </Link>
          )}
 </p>
          {/* to  show the text */}
          {isExpanded && (
            <p>
              Our vision is to be the trusted partner for all your automotive
              needs, equipped with a skilled team, state-of-the-art tools, and
              dedication to offering reliable and efficient services. Whether
              you&apos;re in need of quick repairs or routine maintenance, Car Zone
              ensures a safe and seamless experience for all car owners. Visit
              us today to experience the best in automotive care!
            </p>
          )}
        </div>
      
      <div className="image">
        <img src={Banner} alt="" /> 
      </div>
    </div>
    {/* end about us */}
    <Offers/>
   <Footer/>
  </div>
   </>
  )
}

export default Home
  
  