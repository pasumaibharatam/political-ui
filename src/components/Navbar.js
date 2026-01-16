import { Link } from "react-router-dom";
import "./Navbar.css";
import React, { useState } from "react";

function Navbar() {
   const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">பசுமை பாரத மக்கள் கட்சி</div>
        <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>
      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setOpen(false)}>முகப்பு</Link></li>
        <li><Link to="/district-secretaries" onClick={() => setOpen(false)}>மாவட்ட செயலாளர்கள்</Link></li>
        <li><Link to="/register" onClick={() => setOpen(false)}>உறுப்பினர் பதிவு</Link></li>
        <li><Link to="/download-id" onClick={() => setOpen(false)}>அடையாள அட்டை பதிவிறக்கம்</Link></li>
        <li><Link to="/admin" onClick={() => setOpen(false)}>நிர்வாகம்</Link></li>

        
      </ul>
    </nav>
  );
}

export default Navbar;
