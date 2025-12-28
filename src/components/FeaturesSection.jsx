import React from "react";
import "./FeaturesSection.css";

const features = [
  {
    title: "மூலோபாயம்",
    desc: "சுற்றுச்சூழல் பாதுகாப்பு மற்றும் சமூக நலன் முன்னேற்றம்.",
    icon: "/icons/strategy.png",
  },
  {
    title: "சமூக சேவை",
    desc: "நலத்திட்டங்கள் மற்றும் சமூக பங்களிப்பு.",
    icon: "/icons/community.png",
  },
  {
    title: "இளைஞர் பிரிவு",
    desc: "இளைஞர்களுக்கான பயிற்சி மற்றும் வாய்ப்புகள்.",
    icon: "/icons/youth.png",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2>எங்கள் சேவைகள்</h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <img src={f.icon} alt={f.title} loading="lazy" />
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
