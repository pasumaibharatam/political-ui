import { Link } from "react-router-dom";
import "./Navbar.css";
import React, { useState } from "react";

function Navbar() {
   const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">PBMK</div>
        <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>
      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
        <li><Link to="/register" onClick={() => setOpen(false)}>Register</Link></li>
        <li><Link to="/download-id" onClick={() => setOpen(false)}>Download ID</Link></li>
        <li><Link to="/admin" onClick={() => setOpen(false)}>Admin</Link></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
