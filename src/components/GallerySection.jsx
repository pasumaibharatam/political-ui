import React from "react";
import "./GallerySection.css";

const photos = [
  "/images/event1.jpeg",
  "/images/event2.jpeg",
  "/images/event3.jpeg",
  "/images/event4.jpeg",
];

const GallerySection = () => {
  return (
    <section className="gallery-home">
      <h2>நிகழ்ச்சிகள் & படங்கள்</h2>
      <div className="gallery-grid">
        {photos.map((src, i) => (
          <div key={i} className="gallery-item">
            <img src={src} alt={`Event ${i+1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
