import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left */}
        <div className="footer-section">
          <h3>Pasumai Bharatham</h3>
          <p>
            மக்கள் நலன் – சுற்றுச்சூழல் பாதுகாப்பு – சமூக முன்னேற்றம்
          </p>
        </div>

        {/* Center */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/download-id">Download ID</a></li>
            <li><a href="/admin-login">Admin</a></li>
          </ul>
        </div>

        {/* Right */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📞 +91 82486 26406</p>
          <p>📧 support@pasumaibharatham.org</p>
          <p>📍 Tamil Nadu, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Pasumai Bharatham. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
