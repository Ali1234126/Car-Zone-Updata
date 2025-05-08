// import { useState, useEffect, useRef } from "react";


// const JS = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [isPopupActive, setIsPopupActive] = useState(false);
//   const [headerBg, setHeaderBg] = useState("transparent");
//   const [showScrollBtn, setShowScrollBtn] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const fullTextRef = useRef(null);
//   const readMoreRef = useRef(null);

//   const handleRegisterClick = () => setIsActive(true);
//   const handleLoginClick = () => setIsActive(false);
//   const handlePopupLogin = () => setIsPopupActive(true);
//   const handleClosePopup = () => setIsPopupActive(false);
//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login successful");
//     setIsPopupActive(false);
//   };

//   const handleRegisterSubmit = (e) => {
//     e.preventDefault();
//     console.log("Registration successful");
//     setIsPopupActive(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollBtn(window.scrollY >= 100);
//       setHeaderBg(window.scrollY >= 30 ? "#162938" : "transparent");
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//   };

//   const showText = () => {
//     if (fullTextRef.current && readMoreRef.current) {
//       fullTextRef.current.style.display = "block";
//       readMoreRef.current.style.display = "none";
//     }
//   };

//   return (
//     <div className={`wrapper ${isActive ? "active" : ""} ${isPopupActive ? "active-pop" : ""}`}>
//       <header style={{ background: headerBg }}>Header Content</header>

//       <nav className={`navigation ${isMenuOpen ? "" : "hide"}`}>
//         <button onClick={toggleMenu} className="btnMenu">
//           {isMenuOpen ? "✖" : "☰"}
//         </button>
//       </nav>

//       <button onClick={handlePopupLogin} className="btnLogin">
//         Login
//       </button>

//       {isPopupActive && (
//         <div className="login-popup">
//           <button onClick={handleClosePopup} className="icon-close">✖</button>
//           <form onSubmit={handleLoginSubmit}>
//             <input type="email" placeholder="Email" required />
//             <input type="password" placeholder="Password" required />
//             <button type="submit">Login</button>
//           </form>
//         </div>
//       )}

//       <button onClick={scrollToTop} id="btnScroll" style={{ display: showScrollBtn ? "block" : "none" }}>
//         ↑
//       </button>

//       <section>
//         <p>
//           Short text...
//           <span id="full-text" ref={fullTextRef} style={{ display: "none" }}>
//             Full text content here.
//           </span>
//         </p>
//         <button id="read-more" ref={readMoreRef} onClick={showText}>
//           Read More
//         </button>
//       </section>

//       <button onClick={handleRegisterClick}>Register</button>
//       <button onClick={handleLoginClick}>Login</button>
//     </div>
//   );
// };

// export default JS;
