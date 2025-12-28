import React, { useState } from "react";
import "./DownloadID.css";
const DownloadID = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setError("");

    // try {
    //   const response = await fetch(
    //     `http://127.0.0.1:8000/download-id/${mobile}`
    //   );
    try {
  const response = await fetch(
    `https://political-backend-wvrc.onrender.com/download-id/${mobile}`
  );

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${mobile}_ID_Card.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="download-container">
      <h2>அடையாள அட்டை பதிவிறக்கம்</h2>
<div className="download-box">
      <input
        type="text"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <br /><br />

      <button onClick={handleDownload}>அடையாள அட்டை பதிவிறக்கம்</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default DownloadID;
