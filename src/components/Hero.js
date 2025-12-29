import "./Hero.css";
import { Link } from "react-router-dom";


function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>பசுமை பாரத மக்கள் கட்சி</h1>
        <p>சுற்றுச்சூழல் • சமத்துவம் • சமூக நீதி</p>

        <button className="hero-btn"> <Link to="/register" className="hero-btn">
          உறுப்பினர் பதிவு
        </Link>
        </button>
      </div>
    
    </section>
     
  );
}

export default Hero;
