import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
       <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <h2>
            CAR <span>ZONE</span>
          </h2>
          <p>Your trusted car service center. Excellence is our drive.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
             <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/Store">Store</Link>
            </li>
            <li>
            <Link to="/Location">Location</Link>
            </li>
            <li>
            <Link to="/Events">Events</Link>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@carzone.com</p>
          <p>Phone: 01557775652</p>
          <p>Address: 123 Nasr City</p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <a href="#">
            <i className="fa-brands fa-facebook" />
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram" />
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Car Zone. All Rights Reserved.</p>
      </div>
    </footer>
    </div>
  )
}

export default Footer
