import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";

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

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية بعد تسجيل الخروج
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
