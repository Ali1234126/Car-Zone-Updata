import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import axios from "axios";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 const handleLogout = async () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  if (!token || !email) {
    console.error("لا يوجد بيانات لتسجيل الخروج.");
    return;
  }

  try {
    const response = await axios.post(
      "https://sunny-macaque-arguably.ngrok-free.app/api/logout",
      { email }, // فقط البريد في البودي (لو كان مطلوب)
      {
        headers: {
          Authorization: `Bearer ${token}`, // التوكن في الهيدر
        },
      }
    );

    console.log("تم الرد من الـ API:", response.data);

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    navigate("/");
    setIsLoggedIn(false);
  } catch (err) {
    console.error("فشل تسجيل الخروج:", err);
  }
};


  return (
    <header className={headerFixed ? "scrolled" : ""}>
      <h2 className="logo">
        <span>CAR</span>ZONE
      </h2>

      <i
        id="btnMenu"
        className={`fa-solid ${isMenuOpen ? "fa-times" : "fa-bars"}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ cursor: "pointer" }}
      />

      <nav className={`navigation ${isMenuOpen ? "hide" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/location">Location</Link>
        <Link to="/events">Events</Link>

        {isLoggedIn ? (
          <>
            <button onClick={() => navigate('/cart')} className="cart-button">
              <i className="fa-solid fa-cart-shopping"></i>
            </button>

            <button className="logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <LoginButton />
        )}
      </nav>
    </header>
  );
}

export default Header;
