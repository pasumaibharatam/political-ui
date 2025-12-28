import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">PBMK</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li>About</li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/download-id">ID Card</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
